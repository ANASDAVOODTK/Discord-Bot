require('dotenv').config();
const Discord = require("discord.js")
const client = new Discord.Client()
const request = require('request');
var axios = require('axios');
var firebase = require('firebase');
var crypto = require('crypto');



var firebaseConfig = {
  apiKey: "AIzaSyDt6eb9buDMCap2GdwF7Y9TcOJaz_B6u8o",
  authDomain: "bot-discord-f0d02.firebaseapp.com",
  projectId: "bot-discord-f0d02",
  storageBucket: "bot-discord-f0d02.appspot.com",
  messagingSenderId: "845388166393",
  appId: "1:845388166393:web:ed567721531f1259d5de28",
  measurementId: "G-87QDVGX3Q2"
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const customersRef = firebase.database().ref('/users');

let urls = 'https://cdn-api.co-vin.in/api/v2/admin/location/states'

let options = { json: true };
let optionssta = { json: true };
const prefix = "!";
const prefix1 = "#";
const prefixph = "91";

client.on("ready", () => {
  console.log('Ready');
  client.guilds.cache.forEach((guild) => {
    // Getting one of their channels
    let channel = guild.channels.cache.array()[2];
    // Sending the channel a message
    channel.send("Hey\n Type **help** to know the bot");

  });


})

client.on("message", async msg => {
  message = msg.content;



  //this one stop the self looping
  if (msg.author.bot) {
    console.log('Ignoring bot message!');
    return;
  }

  if (message.includes('help')) {


    msg.channel.send({
      embed: {
        title: "BOT HELP",
        color: 3447003,
        description: "Enter **vaccine** to know avilable vaccine centers \n\n Enter **register** for registration \n\n Enter **notify** to get notification of avilable solts"
      }
    });
  }



  if (message.includes('notify')) {

    msg.channel.send("working on.....")

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

          num_str += state[i].state_name.toString() + " 🆔 == " + "!" + body.states[i].state_id.toString()

          if (i < (arr_len - 1)) {
            num_str += '\n';
          }
        }

        setTimeout(function () {

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
  if (msg.content.startsWith(prefix)) {
    msg.reply("HI Choose You District");

    const useerinput = msg.content.slice(prefix.length).trim().split(' ');

    let urld = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + useerinput

    request(urld, options, (error, res, body) => {
      if (error) {
        return console.log(error)
      };

      if (!error && res.statusCode == 200) {

        var district = body.districts

        var dislength = district.length;

        var dist_string = '';

        for (var i = 0; i < dislength; i++) {
          var dist_data = district[i].district_name.toString() + " (" + " Id: " + body.districts[i].district_id.toString() + ")";
          console.log(dist_data);

          dist_string += district[i].district_name.toString() + " 🆔 == " + "#" + body.districts[i].district_id.toString()

          if (i < (dislength - 1)) {
            dist_string += '\n';
          }
        }

        setTimeout(function () {

          msg.channel.send({
            embed: {
              title: "Choose Your District",
              color: 3447003,
              description: `${dist_string}`
            }
          });

        }, 1 * 1000);


      };
    });


  }

  if (msg.content.startsWith(prefix1)) {
    var dist_id1 = msg.content.slice(prefix1.length).trim().split(' ');

    msg.author.send("\n" + "Please Enter Your Preferred Date in this format ** 01-05-2021 **");
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 20000 });
    console.log(collector)
    collector.on('collect', msg2 => {
      var date = msg2.content;
      console.log(date)

      msg.reply("\n" + "** Center Details **");

      let url12 = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + dist_id1 + "&date=" + date

      console.log(url12)

      request(url12, options, (error, res, body) => {
        if (error) {
          msg.reply("I can't See any Available Center")
          return console.log(error)

        };

        if (!error && res.statusCode == 200) {
          // here the data of center name
          var session = body.sessions

          var s_str = '';

          var s_len = session.length;

          for (var i = 0; i < s_len; i++) {
            var session_data = session[i].center_id.toString() + " (" + body.sessions[i].name.toString() + ")" + " (" + body.sessions[i].block_name.toString() + ")" + " (" + body.sessions[i].pincode.toString() + ")" + " (" + body.sessions[i].from.toString() + ")" + " (" + body.sessions[i].to.toString() + ")" + " (" + body.sessions[i].lat.toString() + ")" + " (" + body.sessions[i].long.toString() + ")" + " (" + body.sessions[i].slots.toString() + ")";
            console.log(session_data);

            s_str += " 🏥 ➡️  " + "Center Id: " + session[i].center_id.toString() + "\n" + body.sessions[i].name.toString() + "\n" + body.sessions[i].block_name.toString() + " PIN " + body.sessions[i].pincode.toString() + " From" + body.sessions[i].from.toString() + " to " + body.sessions[i].to.toString() + "Location" + body.sessions[i].lat.toString() + "Location" + body.sessions[i].long.toString() + " Session Timings" + body.sessions[i].slots.toString()

            if (i < (s_len - 1)) {
              s_str += '\n';
            }
          }

          setTimeout(function () {

            msg.channel.send({
              embed: {
                Title: "Session Details",
                color: 3447003,
                description: `${s_str}`

              }
            });

          }, 1 * 1000);
        }
        else {
          msg.reply("I Can't see any available slots")
        }
      });

    })
  }

  //OTP Generations

  if (message.includes('register')) {

    msg.channel.send("🔒 I Concernd Your privacy such as OTP,Personal info so I send Further details personaly 🔒")
    msg.author.send("Enter your Phone number with contry code (91) 📞")

  }

  //OTP Generations

  if (msg.content.startsWith(prefixph)) {

    const phone = msg.content.slice(prefixph.length).trim().split(' ');

    var data = JSON.stringify({
      "mobile": "{{" + phone + "}}",
      "secret": "{{U2FsdGVkX1+z/4Nr9nta+2DrVJSv7KS6VoQUSQ1ZXYDx/CJUkWxFYG6P3iM/VW+6jLQ9RDQVzp/RcZ8kbT41xw==}}"
    });

    var config = {
      method: 'post',
      url: 'https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.txnId);
        console.log(msg.author.id)

        customersRef.child(msg.author.id).update({
          txnID: response.data.txnId,
          userId: msg.author.id,
        });

        msg.author.send("Enter OTP ");
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
        console.log(collector)
        collector.on('collect', msg1 => {

          //OTP Convert to SHA256

          const code = crypto.createHash('sha256').update(msg1.content).digest('hex');
          console.log(code)
          console.log(msg1.content)
          //OTP Confirmation

          var data = JSON.stringify({
            "otp": "{{" + code + "}}",
            "txnId": "{{" + response.data.txnId + "}}"
          });

          var config = {
            method: 'post',
            url: 'https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
              'Content-Type': 'application/json'
            },
            data: data
          };

          axios(config)
            .then(function (response) {
              msg.reply("OTP Verification Success 👍")
              console.log(JSON.stringify(response.data));
              customersRef.child(msg.author.id).update({
                token: response.data.token,
              });
            })
            .catch(function (error) {
              console.log(error);
              msg.reply("OTP is incorrect 👎")
            });

        })

      })
      .catch(function (error) {
        console.log(error);
      });



  }

})


client.login(process.env.TOKEN)