const tmi = require('tmi.js');
const SteamUser = require('steam-user');
require('dotenv').config();
// Define configuration options

// channels to scrape
const client = new tmi.client({
  channels:['#channel']
})
client.on('message', onMessageHandler);
client.connect();

console.log("username:"+process.env.STEAM_USERNAME)
const sclient = new SteamUser();
function steamlogin(){
  sclient.logOn({
    accountName: process.env.STEAM_USERNAME,
    password: process.env.STEAM_PASSWORD
  });
  sclient.on('loggedOn', (details) => {
    console.log(details)
    console.log('Logged into Steam');
  });
}

const re = new RegExp('[A-z0-9]{4,5}-[A-z0-9]{4,5}-[A-z0-9]{4,5}')
const re2 = new RegExp('[A-z0-9]{4,6}-[A-z0-9]{4,6}-[A-z0-9]{4,6}-[A-z0-9]{4,6}-[A-z0-9]{4,6}')

steamlogin();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  const commandName = msg.trim();
  console.log("command:"+commandName)
  var result = re.exec(commandName);
  var result2 = re2.exec(commandName);
  if (result2 !== null) {
    console.log(`#1 ${result2}`);
    redeem_key(result2)
  } else if (result !== null) {
    console.log(`#2 ${result}`);
    redeem_key(result)
  } 

}

async function redeem_key(key)
{
    console.log("redeeming key:"+key)
    sclient.redeemKey(key, (err) => {
      if (err) {
        console.log("fail:"+err);
      }
      else
      {
        console.log("success:"+err);
      }
    });
}