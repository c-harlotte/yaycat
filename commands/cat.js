const { default: axios } = require("axios");
const Discord = require("discord.js");
const r2 = require("r2");

module.exports.run = async (bot, message, args) => {
  let response = await r2.get("https://api.thecatapi.com/v1/images/search")
    .json;
  try {
    let resp = axios.get("https://catfact.ninja/fact").then((resp) => {
      let fact = resp.data.fact;
      const embed = new Discord.MessageEmbed()
        .setImage(response[0].url)
        .setDescription(fact)
        .setColor("RANDOM");
      return message.channel.send({ embed });
    });
  } catch (err) {
    return console.log(err.stack);
  }
};

module.exports.help = {
  name: "cat",
};
