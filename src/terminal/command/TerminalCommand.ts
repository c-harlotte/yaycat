/* eslint-disable @typescript-eslint/no-empty-function */
export default abstract class TerminalCommand {
  readonly name: string;

  readonly description: string;

  readonly aliases: string[] = [];

  constructor(name: string, description: string, aliases: string[] = []) {
    this.name = name;
    this.description = description;
    this.aliases = aliases;
  }

  onLoad(): void | Promise<void> {}

  onReady(): void | Promise<void> {}

  abstract run(label: string, args: string[]): void | Promise<void>;

  toString(): string {
    return `[${this.name}: ${TerminalCommand.name}]`;
  }
}
