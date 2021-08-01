/**
 * @file src/commands/restart.ts
 * Restarts the bot. (maintainers only)
 * @author C-HARLOTTE
 * @author lambdagg <lambda@jikt.im>
 */

import { Message, MessageEmbed, TextChannel } from "discord.js";
import { promises as fsPromises } from "fs";
import { join } from "path";
import { exec } from "child_process";
import type { Client } from "../Client";
import { debug, error, info, trace } from "../logger";
import Command from "./Command";
import { RichPermission, RichPermissions } from "../utils/Permission";

const RESTART_FILE = join(__dirname, "..", "RESTART.YAY");

export default class extends Command {
  constructor(client: Client) {
    super(
      "restart",
      "restart the bot (maintainers only)",
      RichPermissions.BOT_MAINTAINER as RichPermission,
      ["update"],
      client
    );
  }

  async onReady(): Promise<void> {
    try {
      const lines = (
        await fsPromises.readFile(RESTART_FILE, { encoding: "utf-8" })
      ).split("\n");
      debug("Restartfile found");
      await fsPromises.unlink(RESTART_FILE); // delete da file
      trace("Restartfile deleted");
      if (lines.length !== 2) throw new Error("File was altered or corrupted.");
      const msg = (
        await (
          this.client.channels.cache.get(lines[0]) as TextChannel
        ).messages.fetch()
      ).get(lines[1]);
      await msg.edit(
        new MessageEmbed()
          .setAuthor("I'm back!")
          .setDescription("Bot restarted with success.")
          .setColor(0x00ff00)
          .setFooter(msg.embeds[0].footer.text, msg.embeds[0].footer.iconURL)
      );
      info("Restart message updated!");
    } catch (ex) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (ex.code === "ENOENT") return debug("No restartfile found.");
      error("Could not read restart file:");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      error(ex.stack || ex);
    }
  }

  async run(label: string, message: Message): Promise<boolean> {
    const msg = await message.channel.send(
      new MessageEmbed()
        .setAuthor(
          label === "update" ? "Update..." : "Restarting...",
          "https://cdn.discordapp.com/emojis/585682049172635649.gif?v=1"
        )
        .setDescription("I'll be back in a sec!")
        .setColor(0xff0000)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp()
    );
    await fsPromises.writeFile(RESTART_FILE, `${msg.channel.id}\n${msg.id}`, {
      encoding: "utf-8",
    });
    this.client.destroy();
    exec("pm2 restart app");
    return true;
  }
}
