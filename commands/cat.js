const Discord = require("discord.js");
const { get } = require("snekfetch"); 

module.exports.run = async (bot, message, args) => {
    try {
      get('https://aws.random.cat/meow').then(res => {
        const embed = new Discord.MessageEmbed()
        .setImage(res.body.file)
        return message.channel.send({embed});
      });
    } catch(err) {
      return console.log(err.stack);
    }
}

module.exports.help = {
  name:"cat"
}