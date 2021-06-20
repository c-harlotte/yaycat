const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if (!config.maintainers.includes(message.author.id)) return;
    const embed = new Discord.MessageEmbed()
        .setAuthor('Updating...', 'https://cdn.discordapp.com/emojis/585682049172635649.gif?v=1')
        .setDescription(`I'll be back in a sec!`)
        .setColor(0xff0000)

    message.channel.send(embed).then(function(m) {
        require('child_process').exec("git pull && pm2 reload app", function() {
            bot.destroy();
            process.exit();
        });
        const embed2 = new Discord.MessageEmbed()
            .setTitle('Done!')
            .setDescription(`I'm back!`)
            .setColor(0x00ff00)
            
        m.edit(embed2)
    })
}

module.exports.help = {
  name: "update",

  description: "update the bot (FOR CHARLOTTE ONLY)",
}