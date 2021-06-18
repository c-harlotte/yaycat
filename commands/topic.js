const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const noPerms = new Discord.MessageEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription(`${message.author.username}, you can't do that!`)
    .setColor(0xff0000)
    .setFooter(`bot by charlotte`);

  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return msg.channel.send(noPerms);
  message.channel.setTopic(args.join(" "));
  const yes = new Discord.MessageEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription(
      `${message.author.username}, changed the channel topic to: ` +
        args.join(" ")
    )
    .setColor(0xff0000)
    .setFooter(`bot by charlotte`);
  message.channel.send(yes);
};

module.exports.help = {
  name: "topic",

  description: "change channel topic",
};
