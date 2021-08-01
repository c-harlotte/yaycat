/**
 * @file src/commands/Command.ts
 * Represents a Command.
 * @author lambdagg <lambda@jikt.im>
 */

/* eslint-disable @typescript-eslint/no-empty-function */
import type { Message } from "discord.js";
import type { Client } from "../Client";
import { RichPermission, RichPermissions } from "../utils/Permission";

export default abstract class Command {
  readonly client: Client;

  readonly name: string;

  readonly description: string;

  permission: RichPermission;

  readonly aliases: string[] = [];

  constructor(
    name: string,
    description: string,
    permission: RichPermission,
    aliases: string[] = [],
    client: Client
  ) {
    this.name = name;
    this.description = description;
    this.permission = permission;
    this.aliases = aliases;
    this.client = client;
  }

  onLoad(): void | Promise<void> {}

  onReady(): void | Promise<void> {}

  abstract run(
    label: string,
    message: Message,
    args: string[]
  ): boolean | Promise<boolean>;

  toString(): string {
    return `[${this.name}: ${Command.name}]`;
  }

  static getRich(perm: string | number): RichPermission {
    return (RichPermissions[perm] as RichPermission) || null;
  }
}
