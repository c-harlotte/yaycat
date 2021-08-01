import { join } from "path";
import { createInterface, cursorTo, Interface } from "readline";
import { bold } from "chalk";
// eslint-disable-next-line import/no-cycle
import { trace } from "../logger";
import type { Client } from "../Client";
import type TerminalCommand from "./command/TerminalCommand";

export default class TerminalExt {
  static INSTANCE: TerminalExt;

  readonly interface: Interface;

  readonly client: Client;

  readonly commands: TerminalCommand[] = [];

  constructor(client: Client) {
    trace(`Creating the ${TerminalExt.name} instance...`);

    this.client = client;

    client.recursivelyLoad("terminalCommand", join(__dirname, "command"));

    this.interface = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: bold("YAY>"),
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.interface.on("line", async (raw: string) => {
      if (!raw) {
        return this.log("no command input to process");
      }
      const args = raw.split(/\s+/g);
      const cmdName = args.shift().toLowerCase();
      const cmd = this.commands.find(
        (c) => c.name === cmdName || c.aliases.includes(cmdName)
      );
      if (!cmd) {
        return this.log(`command not recognized ; try using ${bold("help")}`);
      }
      await cmd.run(cmdName, args);
    });

    // Graceful shutdown
    this.interface.on("SIGINT", () => {
      console.log("\n");
      this.interface.emit("line", "exit");
    });

    trace(`${TerminalExt.name} loaded!`);
    TerminalExt.INSTANCE = this;
  }

  log(str: string): void {
    cursorTo(process.stdout, 0);
    console.log(str);
    this.interface.prompt(true);
  }

  async onReady(): Promise<void> {
    await Promise.all(this.commands.map(async (cmd) => cmd.onLoad()));
  }

  static init(client: Client): TerminalExt {
    return new TerminalExt(client);
  }
}
