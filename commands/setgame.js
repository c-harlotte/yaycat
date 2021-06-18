const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let game = args.join(" ");

  const noPerms = new Discord.MessageEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setDescription(`${message.author.username}, you can't do that!`)
    .setColor(0xff0000)
    .setFooter(`bot by charlotte`);

  if (!config.maintainers.includes(message.author.id))
    return message.channel.send(noPerms);
  bot.user.setActivity(game, { type: "PLAYING" });
};

module.exports.help = {
  name: "setgame",
  description: "set status",
};
