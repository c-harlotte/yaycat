import TerminalExt from "../terminal/TerminalExt";
import type { Client } from "../Client";
import type Command from "../commands/Command";
import { info } from "../logger";
import Event from "./Event";

export default class ReadyEvent extends Event {
  private static interval: NodeJS.Timeout;

  constructor(client: Client) {
    super(client, "ready");
  }

  async run(): Promise<void> {
    if (ReadyEvent.interval) clearInterval(ReadyEvent.interval);

    await Promise.all([
      this.client.events.map(async (e: Event) => e.onReady()),
      this.client.commands.map(async (c: Command) => c.onReady()),
      TerminalExt.INSTANCE?.onReady(),
    ]);

    info(
      `Ready! ${this.client.events.length} events, ${this.client.commands.length} commands loaded for ${this.client.guilds.cache.size} guilds, ${this.client.users.cache.size} users.`
    );

    this.client.ready = true;

    if (TerminalExt.INSTANCE) info("Type 'help' to get the terminal help.");

    // Status shit
    /* if (!this.client.config.status?.available?.length) return;
    const status = () => {
      const available = this.client.config.status.available.filter(s => s !== this.client.currentStatus);
      this.client.user.setActivity(available[Math.floor(Math.random()*available.length)] as ActivityOptions);
    }
    status();
    if (this.client.config.status.available.length !== 1) ReadyEvent.interval = setInterval(status, this.client.config.status.timeout * 1000); */
  }
}
