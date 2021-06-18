const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let m = new MessageEmbed().setDescription("Getting ping..");
  let messag = message.channel.send({ embed: m }).then((msg) => {
    let pingEmbed = new MessageEmbed()
      .setTitle("Pong!")
      .addField("WS ping", `${bot.ws.ping}ms`)
      .addField(
        "Edit delay",
        `${msg.createdTimestamp - message.createdTimestamp}ms`
      );

    msg.edit({ embed: pingEmbed });
  });
};

module.exports.help = {
  name: "ping",

  description: 'get bot ping'
};
