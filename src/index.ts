/**
 * @file src/index.ts
 * Creates the Client singleton and registers events from the 'events' folder.
 * @author C-HARLOTTE
 * @author lambdagg <lambda@jikt.im>
 */

import { config as configDotEnv } from "dotenv";
import { join } from "path";
import TerminalExt from "./terminal/TerminalExt";
import { Client } from "./Client";
import { info, trace } from "./logger";

configDotEnv();
info("Starting.");

const client = new Client({
  disableMentions:
    "everyone" /* ws: { properties: { $browser: "Discord iOS" } } */,
});

client.recursivelyLoad("event", join(__dirname, "events"));

const eventQueueInterval = setInterval(() => {
  if (client.ready) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    client.eventQueue?.map((e: any) => client.emit(e.event, ...e.args));
    clearInterval(eventQueueInterval);
  } else trace("Waiting for Client to get ready...");
}, 250);

if (!process.argv.some((arg) => arg.toLowerCase() === "-no-terminal-extension"))
  TerminalExt.init(client);

client.on("disconnect", () => process.exit(0));
void client.login(process.env.DISCORD_TOKEN);
