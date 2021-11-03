const { Client, Intents } = require('discord.js');
const fetch = require("cross-fetch")
const keepAlive = require('./server.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function walter(){
  return fetch("https://breaking-bad-quotes.herokuapp.com/v1/quotes")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["quote"] + " - " + data[0]["author"]
    })
}

function joey(){
  return fetch("https://friends-quotes-api.herokuapp.com/quotes/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data["quote"] + " - " + data["character"]
    })
}
function office(){
  return fetch("https://officeapi.dev/api/quotes/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data.content + " - " + data.character.firstname + " " + data.character.lastname
    })
}
function got(){
  return fetch("https://game-of-thrones-quotes.herokuapp.com/v1/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      if(data.character.house.name===null){
        return data["sentence"] + " - " + data.character.name
      }
      else{
        return data["sentence"] + " - " + data.character.name + " (" + data.character.house.name + ")"
      }
      
    })
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', mssg => {
  if(mssg.author.bot) return 
  if (mssg.content === '/bitch') {
    walter().then(quote => mssg.reply("```"+quote+"```"))
  }
  if(mssg.content === '/break'){
    joey().then(quote => mssg.reply("```"+quote+"```"))
  }
  if(mssg.content === '/got'){
    got().then(quote => mssg.reply("```"+quote+"```"))
  }
    if(mssg.content === '/office'){
    office().then(quote => mssg.reply("```"+quote+"```"))
  }
  
});
const mySecret = process.env['token']
keepAlive();
client.login(mySecret);