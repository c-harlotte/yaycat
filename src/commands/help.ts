/**
 * @file src/commands/help.ts
 * Sends a list of available commands to the sender.
 * @author C-HARLOTTE
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed, PermissionResolvable } from "discord.js";
import type { Client } from "../Client";
import Command from "./Command";

export default class HelpCommand extends Command {
  constructor(client: Client) {
    super("help", "get commands", null, ["aide", ""], client);
  }

  run(_: string, message: Message): boolean {
    let desc = "";
    this.client.commands.forEach((cmd: Command, index, array) => {
      if (
        !(
          cmd.permission &&
          ((cmd.permission.toLowerCase() === "owner" &&
            message.guild.ownerID !== message.author.id) ||
            !message.member.hasPermission(
              cmd.permission as PermissionResolvable
            ))
        )
      )
        desc += `\`${this.client.prefixes[0] || ""}${cmd.name}\` ${
          cmd.description
        }\n`;

      if (index + 1 === array.length)
        // Wait for the end of the forEach iteration. There must be a better way to do that but eh
        (desc.slice(0, -1).match(/.{1024}/g) || [desc.slice(0, -1)]).forEach(
          (item, nestedIndex, nestedArray) => {
            // Split every time the list exceeds 1024.
            void message.channel.send(
              new MessageEmbed()
                .setAuthor(`Help (${nestedIndex + 1}/${nestedArray.length})`)
                .setDescription(item)
                .setColor("#f1c40f")
                .setFooter(
                  `Requested by ${message.author.tag}`,
                  message.author.displayAvatarURL()
                )
                .setTimestamp()
            );
          }
        );
    });
    return !0;
  }
}
