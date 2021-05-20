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
  if (mess.includes('hi')) {
     msg.reply("HI Choose You District");
    //const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
   // msg.channel.send(file);
   request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        
      //console.log("District: "+body.districts[0].district_name+" ("+" Id: "+body.districts[0].district_id+")");

        var district = body.districts
        
        for(var i = 0; i < district.length; i++)
        {
         var dist_data = district[i].district_name+" ("+" Id: "+body.districts[i].district_id+")";
         console.log(dist_data);
        

         msg.reply(dist_data);

         
         if(i = district.length)
          {
           console.log(i +"  "+district.length)
          break;
          }
         

         }
       
    };
  });
   
  }
})


client.login(process.env.TOKEN)