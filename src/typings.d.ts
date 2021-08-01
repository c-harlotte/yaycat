/**
 * @file src/types/global.d.ts
 * Global typings
 * @author lambdagg <lambda@jikt.im>
 */

import { DMChannel, NewsChannel, TextChannel } from "discord.js";

export type AnyTextBasedChannel = TextChannel | DMChannel | NewsChannel;
