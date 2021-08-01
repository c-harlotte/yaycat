/**
 * @file src/events/memberJoin.ts
 * Handles the memberJoin event, and statically registers the invitations on load.
 * @author lambdagg <lambda@jikt.im>
 */

import {
  Collection,
  Guild,
  GuildMember,
  Invite,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import type { Client } from "../Client";
import { debug } from "../logger";
import Event from "./Event";

export default class MemberJoinEvent extends Event {
  static invites: Collection<Guild, Collection<string, Invite>> =
    new Collection();

  constructor(client: Client) {
    super(client, "guildMemberAdd");
  }

  async onReady(): Promise<void> {
    return new Promise((res) => {
      let i = 1;
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      this.client.guilds.cache.forEach(async (guild, _, map) => {
        MemberJoinEvent.invites.set(guild, await guild.fetchInvites());
        if (i === map.size) {
          debug("Invites fetched.");
          res();
        } else i += 1;
      });
    });
  }

  async run(member: GuildMember): Promise<void> {
    if (this.client.config.guild !== member.guild.id) return;
    const guildInvites = await member.guild.fetchInvites();
    const existingInvites = MemberJoinEvent.invites.get(member.guild);
    MemberJoinEvent.invites.set(member.guild, guildInvites);

    const invite: Invite = guildInvites.find(
      (inv) => existingInvites.get(inv.code).uses < inv.uses
    );
    const inviter = invite
      ? invite.code === member.guild.vanityURLCode
        ? "(URL perso)"
        : this.client.users.cache.get(invite.inviter.id).toString() ||
          `<@${invite.inviter.id}>`
      : "(inconnu)";

    await (
      member.guild.channels.cache.find(
        (c) => c.name === "airport"
      ) as TextChannel
    ).send(
      new MessageEmbed()
        .setAuthor(
          `Welcome to ${member.guild.name}, ${member.user.tag}!`,
          member.user.displayAvatarURL()
        )
        .setDescription(
          `We're now ${member.guild.memberCount.toString()} members.\nInvited by ${inviter}`
        )
        .setFooter(
          `${this.client.user.username} - discord.gg/catstare`,
          this.client.user.displayAvatarURL()
        )
        .setTimestamp()
    );
  }
}
