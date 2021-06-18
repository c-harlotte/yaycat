const Discord = require("discord.js");
const axios = require('axios').default
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  const channel = bot.channels.cache.get(args.join(" "));
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
      // work
      console.log("Successfully connected.");

      axios.get('https://catfact.ninja/fact')
      .then(response => {
      const embed = new Discord.MessageEmbed()
      .setTitle(`Joined the VC ` + channel + '!')
      .setDescription(response.data.fact)
      .setColor(0x157f87)
      .setFooter(`${bot.user.username} v${config.version} by ${config.creator}`)
      message.channel.send(embed)
      })
  }).catch(e => {
      // error
      console.error(e);
  });
}

module.exports.help = {
  name:"joinvc"
}