/**
 * @file src/events/Event.ts
 * Represents an Event.
 * @author lambdagg <lambda@jikt.im>
 */

/* eslint-disable @typescript-eslint/no-empty-function */
import type { Client } from "../Client";

export default abstract class Event {
  readonly client: Client;

  readonly name: string;

  constructor(client: Client, name: string) {
    this.client = client;
    this.name = name;
  }

  onLoad(): void | Promise<void> {}

  onReady(): void | Promise<void> {}

  abstract run(...args: unknown[]): void | Promise<void>;
}
