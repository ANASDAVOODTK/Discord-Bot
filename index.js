require('dotenv').config();
const Discord = require("discord.js")
const client = new Discord.Client()
const fetch = require('node-fetch');
const https = require('https');
let url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/17'

fetchDataAsync();


/*client.on("ready", () => {
  console.log('Ready');
})

client.on("message", async msg => {
    mess = msg.content;
  if (mess.includes('hi')) {
    msg.reply("Hello");
    //const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
   // msg.channel.send(file);
    //fetchDataAsync();

  }
})*/

function fetchDataAsync() {
  //let url = "https://www.reddit.com/r/popular.json";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            console.log(json);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});
}


client.login(process.env.TOKEN)