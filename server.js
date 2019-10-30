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
const nric = require('nric');
const request = require('request');

const activities = ["with mixer","with lights","with mics","with condensers"];
const owner = client.users.find(user => user.username == "ZacBytes")

const wrongchannelembed = new Discord.RichEmbed()
.setTitle("Error")
.setColor(`#EF5858`)
.setDescription("Use <#594741385521790986> for bot commands!")
.setTimestamp();

//Start Up_________________________________________________________________________________
client.on('ready', () => {
  var chosenactivity = activities[Math.floor(Math.random()*activities.length)];
  client.user.setActivity(chosenactivity + " | .help", { type: 'PLAYING' });
  console.log(`Logged in as ${client.user.tag}!`);
});

//Member Join______________________________________________________________________________
client.on('guildMemberAdd', member => {
    member.send("Welcome to the official MR Discord! Please change your server nickname to your real name and we will grant you access to the server momentarily."); 
    var general = client.channels.get("594164045452541952")
    const joinembed = new Discord.RichEmbed()
   .setTitle(`${member.displayName} has joined the server!`)
   .setColor(`#FFCD42`)
   .setTimestamp();
    general.send(joinembed)
});

//Commands_________________________________________________________________________________
client.on('message', msg => {
if (msg.author.bot) return;
let lowercase = msg.content.toLowerCase()

//help  
    if (lowercase.startsWith(".help")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const helpembed = new Discord.RichEmbed()
   .setTitle("Bot Usage")
   .setColor(`#0A102A`)
   .addField(".ping", "Sends bot's latency", false)
   .addField(".github", "Provides source code for bot",false)
   .addField(".announce {#channel} {text}", "Posts announcement text to the channel mentioned. Use **<everyone>** or **<here>** to convert",false) 
   .addField(".manual {name}", "Equipment manuals. Names: **E2, CS, M7CL, JESTER**",false)
   .addField(".nric {generate/validate}", "Generates/Validates an NRIC no.",false)
   .addField(".haze", "Provides current PSI from NEA",false);
    msg.channel.send(helpembed)
    }
  
//ping  
    if (lowercase.startsWith(".ping")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const pingembed = new Discord.RichEmbed()
   .setTitle("Ping")
   .setColor(`#FFCD43`)
   .setDescription((new Date().getTime() - msg.createdTimestamp) + "ms")
   .setTimestamp();
    msg.channel.send(pingembed)
    }
                                                                            
    
//github  
    if (lowercase.startsWith(".github")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const githubembed = new Discord.RichEmbed()
   .setTitle("Github Source")
   .setColor(`#FFCD43`)
   .setDescription("https://github.com/ZacBytes/MR_Core")
   .setTimestamp();
    msg.channel.send(githubembed)
    }
  
//nric generate  
    if (lowercase.startsWith(".nric generate")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const nricembed = new Discord.RichEmbed()
   .setTitle("NRIC Generated")
   .setColor(`#4B8BF4`)
   .setDescription(nric.generateNRIC())
   .setTimestamp();
    msg.channel.send(nricembed)
    }
  
//nric validate
    if (lowercase.startsWith(".nric validate")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    var number = msg.content.slice(14).trim()
        console.log(number)
    const nricembed = new Discord.RichEmbed()
   .setTitle("NRIC Validation")
   .setColor(`#4B8BF4`)
   .setDescription(nric.validate(number))
   .setTimestamp();
    msg.channel.send(nricembed)
    }
  
//haze  
    if (lowercase.startsWith(".haze")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
      
  request(`https://api.data.gov.sg/v1/environment/psi`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (!body) {return console.log("Error, not found");}
    let psi_table = body["items"][0]["readings"]["psi_twenty_four_hourly"]
    let status = body["api_info"]["status"]
    
    let national = psi_table["national"]
    let north = psi_table["north"]
    let east = psi_table["east"]
    let south = psi_table["south"]
    let west = psi_table["west"]
    let central = psi_table["central"]
    
    const hazeembed = new Discord.RichEmbed()
   .setTitle("Singapore PSI 24-Hourly")
   .setColor(`#4B8BF4`)
   .setDescription(`Overall Status: **${status}**`)
   .addField("\n National", national,true)
   .addField("\n North", north,true)
   .addField("\n East", east,true)
   .addField("\n South", south,true)
   .addField("\n West", west,true)
    .addField("\n Central", central,true)
   .setFooter("Real-time data from NEA API")
   .setTimestamp();
    msg.channel.send(hazeembed)
  });
    }
  
  
//announce  
    if (lowercase.startsWith(".announce")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const args = msg.content.slice(9).trim().split(/ +/g)
    var chnlid = args[0].slice(2).replace(">","").trim()
    if (!chnlid || !msg.member.hasPermission('ADMINISTRATOR')) return;
    console.log(chnlid)
    var annchannel = client.channels.get(chnlid);
    var text = msg.content.slice(10 + chnlid.length + 3)
    var newtext1 = text.replace("<everyone>","@everyone")
    var newtext2 = newtext1.replace("<here>","@here")
    const announcementembed = new Discord.RichEmbed()
   .setTitle("Announcement")
   .setAuthor(msg.guild.members.get(msg.author.id).displayName, msg.author.avatarURL)
   .setColor(`#4B8BF4`)
   .setDescription(newtext2)
   .setTimestamp();
    annchannel.send(announcementembed)
    }
  
//manuals
    if (lowercase.startsWith(".manual e2")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const e2embed = new Discord.RichEmbed()
   .setTitle("Element 2 Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737497091")
   .setFooter("Element 2 is the lighting board used in CPA 2")
   .setTimestamp();
    msg.channel.send(e2embed)
    }  
  
    if (lowercase.startsWith(".manual cs")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const csembed = new Discord.RichEmbed()
   .setTitle("ColorSource Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737498609")
   .setFooter("ColorSource is the lighting board used in Audi 2")
   .setTimestamp();
    msg.channel.send(csembed)
    }  
  
    if (lowercase.startsWith(".manual jester")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const jesterembed = new Discord.RichEmbed()
   .setTitle("Jester Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://zero88.com/manuals/7340300_jestermanual_3_4.pdf")
   .setFooter("Jester is the lighting board used in CPA 1")
   .setTimestamp();
    msg.channel.send(jesterembed)
    } 
  
    if (lowercase.startsWith(".manual m7cl")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
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