/**
 * @file src/commands/status.ts
 * Is the bot online?
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed } from "discord.js";
import type { Client } from "../Client";
import Command from "./Command";

export default class extends Command {
  constructor(client: Client) {
    super("status", "am I online?", null, ["up"], client);
  }

  async run(_: string, message: Message): Promise<boolean> {
    await message.channel.send(
      new MessageEmbed()
        .setDescription("if you can read this im online")
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
    );
    return true;
  }
}
