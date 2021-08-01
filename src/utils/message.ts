/**
 * @file src/utils/message.ts
 * Utils to manage messages.
 * @author lambdagg <lambda@jikt.im>
 */

import type { MessageOptions } from "child_process";
import {
  APIMessageContentResolvable,
  MessageAdditions,
  User,
  MessageEmbed,
  Message,
} from "discord.js";
import type { AnyTextBasedChannel } from "../typings";

export const deleteTimeout = async (
  channel: AnyTextBasedChannel,
  message:
    | APIMessageContentResolvable
    | (MessageOptions & { split?: false })
    | MessageAdditions
): Promise<Message> => (await channel.send(message)).delete({ timeout: 7500 });

export const errorEmbed = (
  message: string,
  channel: AnyTextBasedChannel,
  requester?: User
): Promise<Message> =>
  deleteTimeout(
    channel,
    new MessageEmbed()
      .setAuthor("❌ We encountered an error")
      .setColor(0xe74c3c)
      .setDescription(message)
      .setFooter(requester ? `Requested by ${requester.tag}` : undefined)
      .setTimestamp()
  );
