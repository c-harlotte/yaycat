/**
 * @file src/commands/ping.ts
 * Sends the current latency of the bot to the sender.
 * @author C-HARLOTTE <charlotte@ahegao.agency>
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed } from "discord.js";
import type { Client } from "../Client";
import Command from "./Command";

export default class PingCommand extends Command {
  constructor(client: Client) {
    super("ping", "get bot ping", null, ["pong", "delay", "latency"], client);
  }

  async run(label: string, message: Message): Promise<boolean> {
    const msg = await message.channel.send(
      new MessageEmbed().setDescription("Getting ping...")
    );
    await msg.edit(
      new MessageEmbed()
        .setAuthor(
          `P${label.toLowerCase() === "pong" ? "i" : "o"}ng! WS: ${Math.abs(
            Math.round(this.client.ws.ping)
          )}ms, API: ${Math.abs(
            Math.round(msg.createdTimestamp - message.createdTimestamp)
          )}ms`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
    );
    return true;
  }
}
