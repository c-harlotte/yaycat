/**
 * @file src/commands/cat.ts
 * Represents the cat command.
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed } from "discord.js";
import { default as axios } from "axios";
import type { Client } from "../Client";
import Command from "./Command";

export default class extends Command {
  constructor(client: Client) {
    super("cat", "get a random cat fact & picture", null, [], client);
  }

  async run(_: string, message: Message): Promise<boolean> {
    await message.channel.send(
      new MessageEmbed()
        .setImage(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (
            await axios.get("https://api.thecatapi.com/v1/images/search")
          ).data[0].url
        )
        .setDescription(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (
            await axios.get("https://catfact.ninja/fact")
          ).data.fact
        )
        .setColor("RANDOM")
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
    );
    return true;
  }
}
