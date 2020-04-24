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
const sghaze = require('sg-haze');
const stscrape = require('st-scraper');
const cnascraper = require('cna-scraper');

const activities = ["with mixer","with lights","with mics","with condensers"];

const wrongchannelembed = new Discord.MessageEmbed()
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
    const joinembed = new Discord.MessageEmbed()
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
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete({ timeout: 4000 }),botmsg.delete({ timeout: 4000 })});
    const helpembed = new Discord.MessageEmbed()
   .setTitle("Bot Usage")
   .setColor(`#0A102A`)
   .addField(".ping", "Sends bot's latency", false)
   .addField(".github", "Provides source code for bot",false)
   .addField(".announce {#channel} {text}", "Posts announcement text to the channel mentioned. Use **<everyone>** or **<here>** to convert",false) 
   .addField(".manual {name}", "Equipment manuals. Names: **E2, CS, M7CL, JESTER**",false)
   .addField(".coinflip", "Flips a coin for you",false)
   .addField(".nric {generate/validate}", "Generates/Validates an NRIC no.",false)
   .addField(".haze", "Provides current PSI from NEA",false)
   .addField(".uvi", "Provides current ultra-violet index data",false)
   .addField(".url validate {url}", "Checks URL validity",false)
   .addField(".st-scrape ${straits times article url}", "Scrapes the article",false)
   .addField(".cna-scrape ${channl news asia article url}", "Scrapes the article",false)
   .addField(".eval", "Evaluate command input, restricted command",false);
    msg.channel.send(helpembed)
    }
  
//ping  
    if (lowercase.startsWith(".ping")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const pingembed = new Discord.MessageEmbed()
   .setTitle("Ping")
   .setColor(`#FFCD43`)
   .setDescription((new Date().getTime() - msg.createdTimestamp) + "ms")
   .setTimestamp();
    msg.channel.send(pingembed)
    }
                                                                            

//github  
    if (lowercase.startsWith(".github")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const githubembed = new Discord.MessageEmbed()
   .setTitle("Github Source")
   .setColor(`#FFCD43`)
   .setDescription("https://github.com/ZacBytes/MR_Core")
   .setTimestamp();
    msg.channel.send(githubembed)
    }
  
//nric generate  
    if (lowercase.startsWith(".nric generate")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const nricembed = new Discord.MessageEmbed()
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
    
    const nricembed = new Discord.MessageEmbed()
   .setTitle("NRIC Validation")
   .setColor(`#4B8BF4`)
   .setDescription(nric.validate(number))
   .setTimestamp();
    msg.channel.send(nricembed)
    }
  
//st-scrape
    if (lowercase.startsWith(".st-scrape")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    var url = msg.content.slice(10).trim()
    
    stscrape.ScrapeArticle(url, function(err, ArticleData){
      const articleembed = new Discord.MessageEmbed()
     .setTitle(ArticleData.title)
     .addField(`**Img Caption**: ${ArticleData.imgcaption.substring(0,230)}`)
     .setDescription(`**Text Preview**: ${ArticleData.text.substring(0,230)}`)
     .setImage(ArticleData.img)
     .setColor(`#4B8BF4`)
     .setFooter(ArticleData.postdate);
      msg.channel.send(articleembed)
    });
    }
  
//cna-scrape
    if (lowercase.startsWith(".cna-scrape")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    var url = msg.content.slice(12).trim()
    
    cnascraper.ScrapeArticle(url, function(err, ArticleData){
      const articleembed = new Discord.MessageEmbed()
     .setTitle(ArticleData.title)
     .addField(`**Img Caption**: ${ArticleData.imgcaption.substring(0,230)}`)
     .setDescription(`**Text Preview**: ${ArticleData.text.substring(0,230)}`)
     .setImage(ArticleData.img["url"])
     .setColor(`#4B8BF4`)
     .setFooter(ArticleData.postdate);
      msg.channel.send(articleembed)
    });
    }
  
//haze  
    if (lowercase.startsWith(".haze")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
      
    sghaze.getPSI(function(err, PSIData){
    
    const hazeembed = new Discord.MessageEmbed()
   .setTitle("Singapore PSI 24-Hourly")
   .setColor(`#4B8BF4`)
   .setDescription(`Air Quality: **${PSIData.HealthStatus}**`)
   .addField("\n National", PSIData.NationalPSI,true)
   .addField("\n North", PSIData.NorthPSI,true)
   .addField("\n East", PSIData.EastPSI,true)
   .addField("\n South", PSIData.SouthPSI,true)
   .addField("\n West", PSIData.WestPSI,true)
    .addField("\n Central", PSIData.CentralPSI,true)
   .setFooter("Real-time data from NEA API")
   .setTimestamp();
    msg.channel.send(hazeembed)
  });
    }
  
//uvi  
    if (lowercase.startsWith(".uvi")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
      
  request(`https://api.data.gov.sg/v1/environment/uv-index`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    if (!body) {return console.log("Error, not found");}
    let uvi = body["items"][0]["index"][0]["value"]
    let status = body["api_info"]["status"]
    
    const uviembed = new Discord.MessageEmbed()
   .setTitle("Singapore UV Index")
   .setColor(`#1ED760`)
   .setDescription(`API Status: **${status}**`)
   .addField("\n National", uvi,true)
   .setFooter("Hourly data from NEA API")
   .setTimestamp();
    msg.channel.send(uviembed)
  });
    }
  
//coinflip
    if (lowercase.startsWith(".coinflip")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    function coinFlip() {
      return (Math.floor(Math.random() * 2) == 0) ? 'Heads' : 'Tails';
    }
    
    const coinembed = new Discord.MessageEmbed()
   .setTitle("Coin Flip")
   .setColor(`#79E6D9`)
   .setDescription(`Landed **${coinFlip()}**!`);
    msg.channel.send(coinembed)
    } 

  
//eval
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

const aclean = text => {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
};

if (msg.content.startsWith(".eval")) {
  if (msg.author.id !== config.ownerID) return;
  let args = msg.content.split(" ").slice(1);
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    msg.channel.send(aclean(evaled), { code: "xl" });
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${aclean(err)}\n\`\`\``);
  }
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
    const announcementembed = new Discord.MessageEmbed()
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
    const e2embed = new Discord.MessageEmbed()
   .setTitle("Element 2 Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737497091")
   .setFooter("Element 2 is the lighting board used in CPA 2")
   .setTimestamp();
    msg.channel.send(e2embed)
    }  
  
    if (lowercase.startsWith(".manual cs")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const csembed = new Discord.MessageEmbed()
   .setTitle("ColorSource Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737498609")
   .setFooter("ColorSource is the lighting board used in Audi 2")
   .setTimestamp();
    msg.channel.send(csembed)
    }  
  
    if (lowercase.startsWith(".manual jester")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const jesterembed = new Discord.MessageEmbed()
   .setTitle("Jester Manual")
   .setColor(`#FFCD43`)
   .setDescription("https://zero88.com/manuals/7340300_jestermanual_3_4.pdf")
   .setFooter("Jester is the lighting board used in CPA 1")
   .setTimestamp();
    msg.channel.send(jesterembed)
    } 
  
    if (lowercase.startsWith(".manual m7cl")) {
    if (msg.channel.id != 594741385521790986) return msg.channel.send(wrongchannelembed).then(botmsg => {msg.delete(4000),botmsg.delete(4000)});
    const m7clembed = new Discord.MessageEmbed()
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
  
    if (lowercase.includes("lol")) {
      msg.react(client.emojis.get("598144351029166080"));
    }
  
    if (lowercase.includes("mr ") || lowercase.includes(" mr") || lowercase.includes("gold class cca")) {
      msg.react(client.emojis.get("595106822034030592"));
    }

});
  
//Login____________________________________________________________________________________
client.login(config.token);