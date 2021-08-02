/**
 * @file src/commands/changeLog.ts
 * Shows what changed in the last commits.
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import type { Client } from "../Client";
import Command from "./Command";

export default class ChangeLogCommand extends Command {
  private static data: unknown[] = [];

  constructor(client: Client) {
    super(
      "changelog",
      "what changed in the last update",
      null,
      ["updates"],
      client
    );
  }

  async onReady(): Promise<void> {
    (
      await axios.get(
        "https://api.github.com/repos/c-harlotte/yaycat/commits?per_page=10"
      )
    ).data.forEach((d: any) =>
      ChangeLogCommand.data.push({
        name: `${d.sha.substring(0, 7)} - ${d.commit.author.name} (${new Date(
          d.commit.author.date
        ).toLocaleDateString()})`,
        message:
          d.commit.message.length > 1024
            ? `${d.commit.message.substr(0, 1022)}...`
            : d.commit.message,
      })
    );
  }

  async run(_: string, message: Message): Promise<boolean> {
    const embed = new MessageEmbed()
      .setTitle("Changelog (showing only last 10)")
      .setURL("https://github.com/c-harlotte/yaycat/commits/main")
      .setColor("RANDOM")
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();
    ChangeLogCommand.data.forEach((d: any) =>
      embed.addField(d.name, d.message)
    );
    await message.channel.send(embed);
    return true;
  }
}
