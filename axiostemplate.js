const Discord = require("discord.js");
const config = require("../config.json");
const axios = require("axios").default;

module.exports.run = async (bot, message, args) => {
  axios
    .get("")
    .then((response) => {
      var test = response;

      console.log(test);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.help = {
  name: "",
};
