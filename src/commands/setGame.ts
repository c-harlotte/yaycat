/**
 * @file src/commands/setGame.ts
 * Sets the bot's status to something different.
 * @author C-HARLOTTE
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed } from "discord.js";
import { inspect } from "util";
import { RichPermission, RichPermissions } from "../utils/Permission";
import Command from "./Command";
import type { Client } from "../Client";

const AVAILABLE_ACTIVITIES = [
  "PLAYING",
  "STREAMING url",
  "LISTENING",
  "WATCHING",
  "COMPETING",
];

const DATA_TYPES: { [key: string]: RegExp } = {
  url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/, // THANKS STACKOVERFLOW https://stackoverflow.com/a/17773849
};

export default class SetGameCommand extends Command {
  constructor(client: Client) {
    super(
      "setgame",
      "change bot's status",
      RichPermissions.BOT_MAINTAINER as RichPermission,
      ["setstatus", "setactivity"],
      client
    );
  }

  async run(_: string, message: Message, args: string[]): Promise<boolean> {
    let type: string;
    const typeData = {};
    if (
      args[0] &&
      AVAILABLE_ACTIVITIES.some(
        (activity) => activity.split(" ")[0] === args[0].toUpperCase()
      )
    ) {
      type = args[0].toUpperCase();
      const split = AVAILABLE_ACTIVITIES.find((activity) =>
        activity.startsWith(type)
      ).split(" ");
      split.shift();
      let shudContinue = true;
      let i = 1;
      while (split.length > 0 && shudContinue) {
        // eslint-disable-next-line no-loop-func
        split.forEach((dataType) => {
          if (DATA_TYPES[dataType].test(args[i])) typeData[dataType] = args[i];
          else shudContinue = false;
        });
        split.shift();
        i += 1;
      }
    }
    const activity = await this.client.user.setActivity(
      args.join(" "),
      typeData
    );
    await message.channel.send(
      new MessageEmbed()
        .setTitle("Done!")
        .setDescription(`New status set:\n${inspect(activity.activities[0])}`)
        .setColor(0x00ff00)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
    );
    return true;
  }
}
