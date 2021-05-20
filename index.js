require('dotenv').config();
const Discord = require("discord.js")
const client = new Discord.Client()
const request = require('request');
let url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/17'


let options = {json: true};

//fetchDataAsync();


client.on("ready", () => {
  console.log('Ready');
})

client.on("message", async msg => {
    mess = msg.content;

 //this is the thing !!!!!!!!!!
    if (msg.author.bot) {
      // do nothing
      console.log('Ignoring bot message!');
      return;
    }


  if (mess.includes('hi')) {
     msg.reply("HI Choose You District");

    //const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
   // msg.channel.send(file);
   request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {

        var district = body.districts
        
        for(var i = 0; i < district.length; i++)
        {
         var dist_data = district[i].district_name.toString()+" ("+" Id: "+body.districts[i].district_id.toString()+")";
         console.log(dist_data);
      
         msg.channel.send({
          embed: {
              title: "District List",
              color: 3447003,
              description: `${JSON.stringify(dist_data)}`
              }
            });
        

         }
       
    };
  });
   
  }
})


client.login(process.env.TOKEN)