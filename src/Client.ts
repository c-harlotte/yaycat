/**
 * @file src/Client.ts
 * Represents the Client singleton and holds config & externals loading.
 * @author lambdagg <lambda@jikt.im>
 */

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-floating-promises */
import type {
  ActivityOptions,
  ClientOptions as DiscordClientOptions,
} from "discord.js";
import { default as TOML, JsonMap } from "@iarna/toml";
import { Client as DiscordClient } from "discord.js";
import { readdirSync, readFile, readFileSync } from "fs";
import { extname, join } from "path";
import { types } from "util";
import { debug, error, trace, warning } from "./logger";
import type Event from "./events/Event";
import type Command from "./commands/Command";
import TerminalExt from "./terminal/TerminalExt";
import type TerminalCommand from "./terminal/command/TerminalCommand";

export interface ClientOptions extends DiscordClientOptions {
  readonly token?: string;
}

export class Client extends DiscordClient {
  ready = false;

  version: string;

  readonly events: Event[] = [];

  readonly commands: Command[] = [];

  readonly prefixes: string[] = [];

  readonly config: JsonMap;

  currentStatus: ActivityOptions = {};

  eventQueue: unknown[];

  constructor(opt?: ClientOptions) {
    super(opt);
    trace("Created Client object");
    if (opt?.token) this.token = opt?.token;
    trace("Loading TOML config...");
    this.config = TOML.parse(
      readFileSync(join(__dirname, "..", "config.toml"), { encoding: "utf-8" })
    );
    trace("TOML config loaded.");
    this.prefixes = (this.config.prefixes ?? []) as string[];
    readFile(
      join(__dirname, "..", "package.json"),
      { encoding: "utf-8" },
      (err, json) => {
        if (err) throw err;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.version = JSON.parse(json).version;
      }
    );
    trace("Client object initialized");
  }

  recursivelyLoad(
    type: "event" | "command" | "terminalCommand",
    path: string
  ): void {
    readdirSync(path).map(async (file) => {
      if (![".js", ".ts"].some((ext) => file.toLowerCase().endsWith(ext))) {
        debug(`Skipped ${type} ${file}`);
        if (!extname(join(path, file)))
          this.recursivelyLoad(type, join(path, file));
        return;
      }
      if (
        [".js", ".ts"].some(
          (ext) => file.toLowerCase() === type.toLowerCase() + ext
        )
      )
        return;
      let loaded: Event | Command | TerminalCommand;
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, new-cap
        loaded = new (await import(join(path, file))).default(this);
        if (
          type === "command" &&
          this.commands.some(
            (cmd) =>
              cmd.name === loaded.name ||
              cmd.aliases.some((alias) =>
                (loaded as Command).aliases.includes(alias)
              )
          )
        ) {
          warning(
            `Command ${loaded.name} was already loaded in another file (error source: ${file})`
          );
          return;
        }
        if (type !== "terminalCommand") this[`${type}s`].push(loaded);
        else TerminalExt.INSTANCE.commands.push(loaded as TerminalCommand);
        if (type === "event")
          this.on(loaded.name, (...args) => {
            if (!this.ready && loaded.name !== "ready") {
              if (!this.eventQueue) this.eventQueue = [];
              this.eventQueue.push({ event: loaded.name, args });
              trace(`Queued event ${loaded.name}!`);
            } else (loaded as Event).run(...args);
          });
        if (types.isAsyncFunction(loaded.onLoad)) await loaded.onLoad();
        else loaded.onLoad();
        debug(`Loaded ${type} ${loaded.name} from ${file}`);
      } catch (err) {
        error(
          `Could not load ${type} ${loaded?.name || "<unknown>"} from ${file}:`
        );
        error(err.stack || err);
      }
    });
  }

  // Database features to (maybe) implement later.
  // Currently based on NeDB.

  /* private query(k: string, v?: any) {
    return !v ? { k } : { k, v };
  }

  volatile(k: string, v?: any): Promise<any> {
    return new Promise(async (res, rej) => {
      if (!v) return res(await this.getVolatile(k));
      const doc = this.query(k, v);
      if (await this.getVolatile(k)) {
        this.db.update(this.query(k), doc, {}, (err, ...args) => {
          if (err) return rej(err);
          res({ err, ...args });
        });
      }
      this.db.insert(doc, (err, ...args) => {
        if (err) return rej(err);
        res({ err, ...args });
      });
    });
  }

  async hasVolatile(k: string): Promise<boolean> {
    return !!(await this.getVolatile(k));
  }

  getVolatile(k: string): Promise<any> {
    return new Promise((res, rej) => {
      this.db.findOne(this.query(k), (err: Error, docs: {v: any}) => {
        if (err) return rej(err);
        res(docs?.v);
      });
    });
  } */
}
