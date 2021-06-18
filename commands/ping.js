const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let messag = message.channel.send("Getting ping...").then((message) => {
    let pingEmbed = new MessageEmbed()
      .setTitle("Pong!")
      .setDescription(`**WS ping**\n${bot.ws.ping}ms`);

    message.edit({ embed: pingEmbed });
  });
};

module.exports.help = {
  name: "ping",
};
