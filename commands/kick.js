const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has("853876814232420362")) return;

  let user = message.mentions.member.first();

  if (!user) return message.channel.send("Please provide a user");

  user.kick();
};

module.exports.help = {
  name: "kick",
  description: "kick a member",
};
