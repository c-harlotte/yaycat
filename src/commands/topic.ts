/**
 * @file src/commands/topic.ts
 * Changes a channel's topic.
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed, Permissions, TextChannel } from "discord.js";
import type { Client } from "../Client";
import Command from "./Command";

export default class extends Command {
  constructor(client: Client) {
    super(
      "topic",
      "change channel topic",
      Command.getRich(Permissions.FLAGS.MANAGE_CHANNELS),
      [],
      client
    );
  }

  async run(_: string, message: Message, args: string[]): Promise<boolean> {
    if (!(message.channel instanceof TextChannel)) return true;
    await message.channel.setTopic(args.join(" "));
    await message.channel.send(
      new MessageEmbed().setDescription(`Topic set to ${message.channel.topic}`)
    );
    return true;
  }
}
