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

//Member Join______________________________________________________________________________
client.on('guildMemberAdd', member => {
    member.send("Welcome to the official MR Discord! Please change your server nickname to your real name and we will grant you access to the server momentarily."); 
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
   .addField(".ping", "Sends bot's latency", false)
   .addField(".github", "Provides source code for bot",false)
   .addField(".manual {name}", "Equipment manuals. Names: E2,CS,M7CL,JESTER",false);
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
                                                                            
    
//github  
    if (lowercase.startsWith(".github")) {
    const githubembed = new Discord.RichEmbed()
   .setTitle("Github Source")
   .setColor(`#FFCD43`)
   .setDescription("https://github.com/ZacBytes/MR_Core")
   .setTimestamp();
    msg.channel.send(githubembed)
    }
  
//manuals
    if (lowercase.startsWith(".manual e2")) {
    const e2embed = new Discord.RichEmbed()
   .setTitle("Element 2 Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737497091")
   .setFooter("Element 2 is the lighting board used in CPA 2")
   .setTimestamp();
    msg.channel.send(e2embed)
    }  
  
    if (lowercase.startsWith(".manual cs")) {
    const csembed = new Discord.RichEmbed()
   .setTitle("ColorSource Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737498609")
   .setFooter("ColorSource is the lighting board used in Audi 2")
   .setTimestamp();
    msg.channel.send(csembed)
    }  
  
    if (lowercase.startsWith(".manual jester")) {
    const jesterembed = new Discord.RichEmbed()
   .setTitle("Jester Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://zero88.com/manuals/7340300_jestermanual_3_4.pdf")
   .setFooter("Jester is the lighting board used in CPA 1")
   .setTimestamp();
    msg.channel.send(jesterembed)
    } 
  
    if (lowercase.startsWith(".manual m7cl")) {
    const m7clembed = new Discord.RichEmbed()
   .setTitle("Yamaha M7CL Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://sg.yamaha.com/files/download/other_assets/7/323187/m7clv3_en_om_i0.pdf")
   .setFooter("Yamaha M7CL is the sound board used in Audi 2 & CPA 2")
   .setTimestamp();
    msg.channel.send(m7clembed)
    }    
  
//futher commands
  
  

  
//fun commands
    if (lowercase.includes("egg")) {
    msg.react("🥚");
    }
  
    if (lowercase.includes("mr ") || lowercase.includes(" mr") || lowercase.includes("gold class cca")) {
    msg.react(client.emojis.get("595106822034030592"));
    }

});

//Login____________________________________________________________________________________
client.login(config.token);