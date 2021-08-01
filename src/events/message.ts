/**
 * @file src/events/message.ts
 * Handles the message event, and registers the command on load.
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

import type { Message, TextChannel } from "discord.js";
import { join } from "path";
import type { Client } from "../Client";
import { debug } from "../logger";
import { errorEmbed } from "../utils/message";
import { hasPermission } from "../utils/Permission";
import Event from "./Event";

export default class MessageEvent extends Event {
  constructor(client: Client) {
    super(client, "message");
  }

  onLoad(): void {
    this.client.recursivelyLoad("command", join(__dirname, "..", "commands"));
  }

  async run(message: Message): Promise<void> {
    if (
      !message ||
      !message.author ||
      !message.channel ||
      !message.content ||
      !message.guild ||
      message.author.bot
    )
      return;

    const prefix = [
      ...this.client.prefixes,
      `${this.client.user.toString()} `.replace("<@!", "<@"),
      `${this.client.user.toString()} `.replace("<@", "<@!"), // @mention fix
    ].find((p) => message.content.startsWith(p));
    if (!prefix) return;

    const [commandLabel, ...args] = message.content
      .trim()
      .slice(prefix.length)
      .split(/\s+/g);
    const commandFile = this.client.commands.find(
      (c) =>
        c.name === commandLabel.toLowerCase() ||
        c.aliases.includes(commandLabel)
    );
    if (!commandFile) return;

    // if(!message.deleted && message.deletable) message.delete(); // Delete messages that are detected as commands
    if (
      (commandFile.permission &&
        !hasPermission(
          this.client,
          message.member,
          message.channel as TextChannel,
          commandFile.permission
        )) ||
      !commandFile.run(commandLabel, message, args)
    ) {
      await errorEmbed(
        `You don't have the required permission to do that (**${commandFile.permission}**).`,
        message.channel,
        message.author
      );
      return;
    }

    debug(
      `${
        message.author.tag
      } ran ${commandLabel} (${commandFile.toString()}): [${args.join(", ")}]`
    );
  }
}
