const { default: axios } = require("axios");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try {
    let resp = axios.get("https://catfact.ninja/fact").then((resp) => {
      let response = axios
        .get("https://api.thecatapi.com/v1/images/search")
        .then((response) => {
          let fact = resp.data.fact;
          const embed = new Discord.MessageEmbed()
            .setImage(response.data[0].url)
            .setDescription(fact)
            .setColor("RANDOM");
          return message.channel.send({ embed });
        });
    });
  } catch (err) {
    return console.log(err.stack);
  }
};

module.exports.help = {
  name: "cat",
  description: "get a random cat fact & picture",
};
