const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let command = args[0];

  let helpCmdEmbed = new Discord.MessageEmbed().setTitle("Commands");
  bot.commands.forEach((command) => {
    helpCmdEmbed.addField(
      command.help.name,
      command.help.description || "no description provided"
    );
  });

  try {
    let c = bot.commands.get(command);
    if (!c) {
      return message.channel.send(helpCmdEmbed);
    }
    if (c) {
      let cmdEmbed = new Discord.MessageEmbed()
        .setTitle(`info on command ${c.help.name}`)
        .setDescription(`description: ${c.help.description}`);
      message.channel.send(cmdEmbed);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.help = {
  name: "help",

  description: "get commands",
};
