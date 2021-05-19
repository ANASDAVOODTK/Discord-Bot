require('dotenv').config();
const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log('Ready');
})

client.on("message", msg => {
    mess = msg.content;
  if (mess.includes('hai')) {
    msg.reply("Hello");
  }
})

client.login(process.env.TOKEN)