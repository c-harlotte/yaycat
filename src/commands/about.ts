/**
 * @file src/commands/about.ts
 * Gathers information about the bot.
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed, version as DJS_VERSION } from "discord.js";
import type { Client } from "../Client";
import Command from "./Command";

export default class AboutCommand extends Command {
  constructor(client: Client) {
    super("about", "get bot info", null, [], client);
  }

  async run(_: string, message: Message): Promise<boolean> {
    await message.channel.send(
      new MessageEmbed()
        .setAuthor(
          `${this.client.user.username}`,
          this.client.user.displayAvatarURL()
        )
        .setTitle(`About`)
        .setDescription(
          `${this.client.user.username} by C-HARLOTTE & [contributors](https://github.com/c-harlotte/yaycat/#contributors).`
        )
        .addField(`Version`, `${this.client.version}`, true)
        .addField(`Prefixes`, `\`${this.client.prefixes.join("`, ")}\``, true)
        .addField(`DiscordJS Version`, `${DJS_VERSION}`, true)
        .addField("NodeJS version", `${process.version}`, true)
        .addField(
          "Changelog",
          `(moved to ${this.client.prefixes[0] ?? ""}**changelog** command!)`
        )
        .setColor(0x157f87)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
    );
    return true;
  }
}
