const Discord, { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let messag = message.channel.send('Getting ping...').then(message => {
    let pingEmbed = new MessageEmbed()
    .setTitle('Pong!')
    .addField({
      name: "WS ping",
      value: `${bot.ws.ping}ms`
    });
    message.edit("");
    message.edit({ embed: pingEmbed });
  })
}

module.exports.help = {
  name:"ping"
}