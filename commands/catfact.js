const Discord = require("discord.js");
const axios = require('axios').default

module.exports.run = async (bot, message, args) => {

axios.get("https://catfact.ninja/fact")
.then(response => {
  return message.channel.send(response.data.fact)
})
.catch(error => {

  console.log(error);

  const errorEmbed = new Discord.MessageEmbed()
  .setTitle(`Something went wrong!`)
  .setDescription("Is the API down? Ping <@454888930408398869> for assistance!")
  .setColor(0x157f87)
  .setFooter(`${bot.user.username} v${config.version} by ${config.creator}`)

  message.channel.send(errorEmbed)

})

}

module.exports.help = {
  name:"catfact"
}

// https://catfact.ninja/fact