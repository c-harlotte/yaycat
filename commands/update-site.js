const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if (!config.maintainers.includes(message.author.id)) return;
    const embed = new Discord.MessageEmbed()
        .setAuthor('Updating...', 'https://cdn.discordapp.com/emojis/585682049172635649.gif?v=1')
        .setDescription(`Updating the site...`)
        .setColor(0xff0000)

    message.channel.send(embed).then(function(m) {
        require('child_process').exec("cd /var/www/catstare.wtf/html && git pull && systemctl restart nginx", function() {
            process.exit();
        });
        const embed2 = new Discord.MessageEmbed()
            .setTitle('Done!')
            .setDescription(`The site has been updated!`)
            .setColor(0x00ff00)
            
        m.edit(embed2)
    })
}

module.exports.help = {
  name: "update-site",

  description: "update the site (FOR CHARLOTTE ONLY)",
}