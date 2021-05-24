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

let database = firebase.database()

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
    channel.send("Hey\nType **help** to know the bot");

  });


})

client.on("message", async msg => {
  message = msg.content;



  //this one stop the self looping
  if (msg.author.bot) {
    console.log('Ignoring bot message!');
    return;
  }

  const details = new Discord.MessageEmbed()
	.setColor(' 0xFFFFFF')
  .setTitle('Type the following to perform the steps')
	.setURL('https://cobot12.s3.ap-south-1.amazonaws.com/bot.png')
	.setAuthor('Covin Bot','https://images.vexels.com/media/users/3/140503/isolated/lists/24882e71e8111a13f3f1055c1ad53cf3-hand-with-injection.png', 'https://discord.js.org')
	.setDescription('Thanks For Choosing ME')
	.setThumbnail('https://cobot12.s3.ap-south-1.amazonaws.com/bot.png')
	.addFields(
    { name: '\u200B', value: '\u200B' },
		{ name: 'myinfo', value: 'TO know your registration details' },
		{ name: '**vaccine**', value: 'To know avilable centers', inline: true },
		{ name: ' **register**', value: 'For registration', inline: true },
    { name: ' **  notify**', value: '    To get notification of the solts', inline: true },
	)
	.setImage('https://cobot12.s3.ap-south-1.amazonaws.com/photo6147825254626602018.jpg')
	.setTimestamp()
  .setFooter('Get Vaccinated', 'https://cobot12.s3.ap-south-1.amazonaws.com/bot.png');
	

  if (message.includes('help')) {

    msg.channel.send(details);

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
              color:  15462131,
              description: `${num_str}`,
              footer: {
                text: "Get Vaccinated",
                icon_url: 'https://cobot12.s3.ap-south-1.amazonaws.com/bot.png',
              },
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
              color:  15462131,
              description: `${dist_string}`,
              footer: {
                text: "Get Vaccinated",
                icon_url: 'https://cobot12.s3.ap-south-1.amazonaws.com/bot.png',
              },
            }
          });

        }, 1 * 1000);


      };
    });


  }

  if (msg.content.startsWith(prefix1)) {
    var dist_id1 = msg.content.slice(prefix1.length).trim().split(' ');

    msg.reply("\n" + "Please Enter Your Preferred Date in this format **DD-MM-YYY ** eg:01-05-2021");
    const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 1000000 });
    console.log(collector)
    collector.on('collect', msg2 => {
      var date = msg2.content;
      console.log(date)
      collector.stop();

      msg.reply("\n" + "** Center Details **");

      let url12 = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + dist_id1 + "&date=" + date

      console.log(url12)

      request(url12, options, (error, res, body) => {
        if (error) {
          msg.reply("Sorry, there is no Centers Avaliable on " + date)
          return console.log(error)

        };

        if (!error && res.statusCode == 200) {
          // here the data of center name
          var session = body.sessions

          var s_str = '';

          var s_len = session.length;

          var j = 0;

          var abc = []

          for (var i = 0; i < s_len; i++) {
            var session_data = session[i].center_id.toString() + " (" + body.sessions[i].name.toString() + ")" + " (" + body.sessions[i].block_name.toString() + ")" + " (" + body.sessions[i].pincode.toString() + ")" + " (" + body.sessions[i].from.toString() + ")" + " (" + body.sessions[i].to.toString() + ")" + " (" + body.sessions[i].lat.toString() + ")" + " (" + body.sessions[i].long.toString() + ")" + " (" + body.sessions[i].slots.toString() + ")";
            console.log(session_data);

            s_str = " :hospital:" + "\n" + "**Center Id: ** " + session[i].center_id.toString() + "\n" +
              "**Center Name: ** " + body.sessions[i].name.toString() + "\n" + "**Block: **" + body.sessions[i].block_name.toString() + " \n" +
              "**PIN: **" + body.sessions[i].pincode.toString() + "\n" +
              "**Fees: **" + body.sessions[i].fee_type.toString() + " \n" + "**Slot Avaliable For Dose 1: **" + body.sessions[i].available_capacity_dose1.toString() + " \n"
              + "**Slot Avaliable For Dose 2: **" + body.sessions[i].available_capacity_dose2.toString() + " \n" + "**Slot Avaliable- **" + body.sessions[i].available_capacity.toString() + " \n"
              + "**Age: **" + body.sessions[i].min_age_limit.toString()+"+" + " \n" + ":syringe:**Vaccine: **" + body.sessions[i].vaccine.toString() + " \n" +
              ":stopwatch:**Session Timings**:stopwatch:" + "\n" + body.sessions[i].slots.toString().replace(/,/g, '\n') + "\n" + "\n"
            abc.push(s_str)
            
          }

      
            setTimeout( async () =>{
              await Promise.all(abc.map(msg1 => (msg.channel.send({
                embed: {
                  Title: "Session Details",
                  color: 3447003,
                  description: `${msg1}`,
                  timestamp: new Date(),
                  footer: {
                    text: `Total Parts ${abc.length}`,
                    icon_url: 'https://cobot12.s3.ap-south-1.amazonaws.com/bot.png',
                  },
  
                }
              }))))
              //var stem = s_str.slice(0,2000)
             

              // msg.channel.send({
              //   embed: {
              //     Title: "Session Details",
              //     color: 3447003,
              //     description: `${s_str}`
  
              //   }
              // });
  
            }, 1 * 1000);
            

            
          

          
        }
        else {
          msg.reply("Sorry, There is no available slots on ")
        }
      });

    })
  }

  //OTP Generations

  if (message.includes('register')) {

    msg.channel.send("I'm Concernd About Your privacy, so I have directly send you the details 🔒")
    msg.author.send("Enter your Phone number with your contry code (91-India) 📞")

  }

  //OTP Generations

  if (msg.content.startsWith(prefixph)) {

    const phone = msg.content.slice(prefixph.length).trim().split(' ');

    customersRef.child(msg.author.id).update({
      phoneno: phone
    });

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
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 100000 });
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
              msg.reply("OTP Verification Successfull 👍")
              console.log(JSON.stringify(response.data));
              customersRef.child(msg.author.id).update({
                token: response.data.token,
              });
              name();
              collector.stop();
            })
            .catch(function (error) {
              console.log(error);
              msg.reply("Sorry, OTP is incorrect 👎")
            });

        })

      })
      .catch(function (error) {
        console.log(error);
      });



  }

  function name() {
    msg.reply("Enter your Full Name")

    const collectorname = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 100000 });

    collectorname.on('collect', msg1 => {

      customersRef.child(msg.author.id).update({
        name: msg1.content,

      });
      dname()
      collectorname.stop();
    })

  }


  function dname() {
    msg.reply("Enter your District")

    const collectordist = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 100000 });

    collectordist.on('collect', msg2 => {

      customersRef.child(msg.author.id).update({
        district: msg2.content,


      });
      address();
      collectordist.stop();
    })

  }

  function address() {
    msg.reply("Enter your Address")

    const collectoraddress = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 1800000 });

    collectoraddress.on('collect', msg3 => {

      customersRef.child(msg.author.id).update({
        address: msg3.content,


      });
      age();
      collectoraddress.stop();
    })

  }

  function age() {
    msg.reply("Enter your age")

    const collectorage = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 1800000 });

    collectorage.on('collect', msg4 => {

      customersRef.child(msg.author.id).update({
        age: msg4.content,


      });
      idtype();
      collectorage.stop();
    })

  }

  function idtype() {
    msg.reply("Enter your ID Type (adhaar, election id, pan card...")

    const collectoridtype = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 1800000 });

    collectoridtype.on('collect', msg6 => {

      customersRef.child(msg.author.id).update({
        idtype: msg6.content,


      });
      idno();
      collectoridtype.stop();
    })

  }

  function idno() {
    msg.reply("Enter your ID Number")

    const collectoridno = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 1800000 });

    collectoridno.on('collect', msg5 => {

      customersRef.child(msg.author.id).update({
        idno: msg5.content,

      });
      msg.reply("✅ Done!!"+"\n"+"Enter 'myinfo' to know your details.");
      collectoridno.stop();
    })

  }

  if (message.includes('myinfo')) {

    customersRef.child(msg.author.id).update({
      userId: msg.author.id,

    });

    msg.channel.send("Checking....⌛")


    setTimeout(function () {
      database.ref("users/" + msg.author.id).once('value')
        .then(function (snapshot) {

          
          var token = snapshot.val().token
          var idno = snapshot.val().idno
          var idtype = snapshot.val().idtype
          var age = snapshot.val().age
          var address = snapshot.val().address
          var district = snapshot.val().district
          var name = snapshot.val().name
          var phoneno = snapshot.val().phoneno

          if (token === undefined || token == null) {
            msg.reply("Sorry You Are Not Registered 😞" + "\n" + "Enter 'register' for registration")
          }
          else if (name === undefined || name == null)
          {
            msg.reply("Hi Your Number Registered, But till your personal data is not added so register again 😞" + "\n" + "Enter 'register' for registration")
          }
          else {
            msg.channel.send("I'm Concernd About Your privacy so I'm sending it directly to you 🔒")
            msg.author.send({
              embed: {
                title: name,
                color: 3447003,
                description: "**Disctrict: **"+district + "\n" + "**Address: **"+address + "\n" + "**Age: **"+age + "\n" + "**Personal ID: **"+idtype + "\n" + "**ID Card no.: **"+idno+"\n"+"**Phone no.: **"+phoneno +"\n"+"\n"
                +"Go to the server to use me Again ",
                footer: {
                  text: "Get Vaccinated",
                  icon_url: 'https://cobot12.s3.ap-south-1.amazonaws.com/bot.png',
                },
              }
            });

          }


        })

    }, 1 * 1000);




  }





})


client.login(process.env.TOKEN)