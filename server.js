//Bot Pinging______________________________________________________________________________
const http = require('http');
const express = require('express');
const app = express();
const config = process.env;
app.get("/", (request, response) => {
 console.log(Date.now() + " Just got pinged!");
 response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
 http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Variables________________________________________________________________________________
const Discord = require('discord.js');
const client = new Discord.Client();

const activities = ["with mixer","with lights","with mics","with condensers"];
const owner = client.users.find(user => user.username == "ZacBytes")

//Start Up_________________________________________________________________________________
client.on('ready', () => {
  var chosenactivity = activities[Math.floor(Math.random()*activities.length)];
  client.user.setActivity(chosenactivity + " | .help", { type: 'PLAYING' });
  console.log(`Logged in as ${client.user.tag}!`);
});

//Commands_________________________________________________________________________________
client.on('message', msg => {
if (msg.author.bot) return;
let lowercase = msg.content.toLowerCase()

//help  
    if (lowercase.startsWith(".help")) {
    const helpembed = new Discord.RichEmbed()
   .setTitle("Bot Usage")
   .setColor(`#0A102A`)
   .addField(".ping", "Sends bot's latency", false);
    msg.channel.send(helpembed)
    }
  
//ping  
    if (lowercase.startsWith(".ping")) {
    const pingembed = new Discord.RichEmbed()
   .setTitle("Ping")
   .setColor(`#FFCD43`)
   .setDescription((new Date().getTime() - msg.createdTimestamp) + "ms")
   .setTimestamp();
    msg.channel.send(pingembed)
    }

//futher commands
  
  


});

//Login____________________________________________________________________________________
client.login(config.token);