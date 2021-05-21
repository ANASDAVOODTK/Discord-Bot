require('dotenv').config();
const Discord = require("discord.js")
const client = new Discord.Client()
const request = require('request');
let urls = 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
let url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/17'

let options = { json: true };
let optionssta = { json: true};

client.on("ready", () => {
  console.log('Ready');
})

client.on("message", async msg => {
  message = msg.content;

  //this one stop the self looping
  if (msg.author.bot) {
    console.log('Ignoring bot message!');
    return;
  }


  if (message.includes('vaccine')) {
    msg.reply("HI Choose You Sate");

    request(urls, optionssta, (error, res, body) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode == 200) {

        var state = body.states

        var arr_len = state.length;

        var num_str = '';

        for (var i = 0; i < arr_len; i++) {
          var state_data = state[i].state_name.toString() + " (" + " Id: " + body.states[i].state_id.toString() + ")";
          console.log(state_data);

          num_str += state[i].state_name.toString()+ " Id: " +"!"+body.states[i].state_id.toString()

          if(i < (arr_len-1) ){
            num_str += '\n';
           }
          }

          setTimeout(function(){
            
          msg.channel.send({
            embed: {
              title: "Sate List",
              color: 3447003,
              description: `${num_str}`
            }
          });
        }, 1 * 1000);



        

      };
    });

  }


  //code for listing districts in the above state
  if (message.includes('districtid')) {
    msg.reply("HI Choose You District");

    request(url, options, (error, res, body) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode == 200) {

        var district = body.districts

        for (var i = 0; i < district.length; i++) {
          var dist_data = district[i].district_name.toString() + " (" + " Id: " + body.districts[i].district_id.toString() + ")";
          console.log(dist_data);

          msg.channel.send({
            embed: {
              title: `${district[i].district_name}`,
              color: 3447003,
              description: `${body.districts[i].district_id}`
            }
          });


        }

      };
    });

  }
})


client.login(process.env.TOKEN)