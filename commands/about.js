const config = require("../config.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${bot.user.username}`, bot.user.avatarURL)
    .setTitle(`About`)
    .setDescription(`${bot.user.username} by ${config.creator}.`)
    .addField(`Version`, `${config.version}`, true)
    .addField(`Prefix`, `${config.prefix}`, true)
    .addField(`Discord.js Version`, `${Discord.version}`, true)
    .addField("Node.js version", `${process.version}`, true)
    .addField("Changelog", `${config.changelog}`)
    .setColor(0x157f87)
    .setFooter(`${bot.user.username} v${config.version}`);
  message.channel.send(embed);
};

module.exports.help = {
  name: "about",

  description: "get bot info",
};
