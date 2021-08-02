/**
 * @file src/utils/Permission.ts
 * Utils to manage permissions.
 * @author lambdagg <lambda@jikt.im>
 */

import {
  GuildMember,
  PermissionResolvable,
  Permissions,
  TextChannel,
  VoiceChannel,
} from "discord.js";
import type { Client } from "../Client";

export const RichPermissions = {
  GUILD_OWNER: "GUILD_OWNER",
  BOT_OWNER: "BOT_OWNER",
  BOT_MAINTAINER: "BOT_MAINTAINER",
  ...Permissions.FLAGS,
};

export type RichPermission = keyof typeof RichPermissions;

/**
 * Check for a RichPermission.
 * @param client The Client object.
 * @param member The GuildMember object.
 * @param checkIn Undefined if we check for the permission in the member's
 *                guild, or a TextChannel | VoiceChannel if we check it in a
 *                certain channel of this guild.
 * @param permission The RichPermission to check.
 * @returns Whether the GuildMember has the permission.
 */
export function hasPermission(
  client: Client,
  member: GuildMember,
  checkIn: undefined | TextChannel | VoiceChannel,
  permission: RichPermission
): boolean {
  if (
    permission === RichPermissions.GUILD_OWNER &&
    member.guild.ownerID !== member.id
  )
    return false;

  if (
    permission === RichPermissions.BOT_OWNER &&
    (client.config.creator ?? "") !== member.id
  )
    return false;

  if (
    permission === RichPermissions.BOT_MAINTAINER &&
    !((client.config.maintainers ?? []) as string[]).includes(member.id)
  )
    return false;

  if (!checkIn) return member.hasPermission(permission as PermissionResolvable);
  if (!member.guild.channels.cache.has(checkIn.id))
    throw new Error("Given channel was not in member's guild.");

  return checkIn.permissionsFor(member).has(permission as PermissionResolvable);
}
