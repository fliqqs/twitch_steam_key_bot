### Twitch Steam Key Bot
Bot for scaping twitch chats for steam keys and redeem them.

install node modules
```
npm install
```
Enter your steam details in the .env file.

Enter the names of channels you wish to read the chat of.
```
const client = new tmi.client({
  channels:['#channel']
})
```
Run with
```
node bot.js
```