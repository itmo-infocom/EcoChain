    const TeleBot = require('telebot');
    var config = require('./config.json');
    const bot = new TeleBot(config.key);
    var Web3 = require('web3');
    var http = require("http");

    /*To make sure you don't overwrite the already set provider when in mist, check first if the web3 is available:*/

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      var web3 = new Web3(new Web3.providers.HttpProvider(config.rpc_server));
    }

  var chat_id = null; // keeps track of chat_id. It will be used to identify the location event fired from specific chat

    bot.on('/dispose', msg => {

      let fromId = msg.from.id;
      chat_id = fromId;
      let firstName = msg.from.first_name;
      let reply = msg.message_id;
      let text = msg.text.split(" ");
      let account = text[1];
      let waste_type = text[2].toLowerCase(); 
      let balance = web3.fromWei(web3.eth.getBalance(account),"ether") + "ETH";

      switch(waste_type){
        // text[1] contains account number
        // text[2] has waste type
        case 'organic':

          // calculate the least balance need to dispose organic waste
          // query the db for the closest SGB location
          
          var response_text = `Dispose. Waste type: `+ waste_type+`. Account balance: `+ balance+ ` Please send your location `;
          var markup = bot.keyboard([[bot.button('location','Send location: ')]],"once"); 
          console.log(JSON.stringify(msg));
          return bot.sendMessage(fromId, response_text, { markup });
          break;

        case 'inorganic':

          var response_text = `Dispose. Waste type: `+ waste_type+`. Account balance: `+ balance+ ` Please send your location `;
          var markup = bot.keyboard([[bot.button('location','Send location: ')]],"once"); 
          return bot.sendMessage(fromId, response_text, { markup });
          break;

        default:
          return bot.sendMessage(fromId, `Invalid waste type`, { reply });

      }  
      
    });


    /*bot.on('/test', msg => {
      
      let fromId = msg.from.id;
      let firstName = msg.from.first_name;
      let reply = msg.message_id;
      //the bot.keyboard() takes first argument as array of arrays
      let markup = bot.keyboard([[bot.button('location','Send your location')]],"once"); 
      //console.log(markup);
      return bot.sendMessage(fromId, "Send location" , { markup });
    });*/


    bot.on('location', msg => {

      // this location event is fired whenever a location is sent in the chat by the user
      // to map the event with the appropriate chat, the chat id can be mapped.

      const {latitude, longitude} = msg.location;   
      let fromId = msg.from.id;
      let firstName = msg.from.first_name;
      let reply = msg.message_id;

      if(chat_id = fromId){
        console.log('Identified Location Object:', JSON.stringify(msg));
        return bot.sendMessage(fromId, `You will soon receive nearby SGB list for your lat: `+latitude+` lon: `+longitude, { reply });
      }else{
        return bot.sendMessage(fromId, `Unexpected location event`, { reply });
      }
        
    });


    /*bot.on('photo', msg => {

      let fromId = msg.from.id;
      let firstName = msg.from.first_name;
      let reply = msg.message_id;
      console.log("You added a photo!");
      return bot.sendMessage(fromId, `You added a photo`, { reply });
    });


    bot.on('/location', msg => {

      let fromId = msg.from.id;
      let firstName = msg.from.first_name;
      let reply = msg.message_id;
      console.log("You have requested a location!");
      return bot.sendVenue(fromId, [59.934280,30.335099], "My Current address","Saint Petersberg, Russia", { reply });
    });*/


    bot.connect();



/*const hostname = '127.0.0.1';
const port = 3000;
  
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/