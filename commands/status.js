const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send("if you can read this im online");
};

module.exports.help = {
  name: "status",
};
