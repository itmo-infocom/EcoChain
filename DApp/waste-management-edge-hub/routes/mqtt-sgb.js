var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');




router.get('/', function(req, res) {

		console.log("runs");
	
		client.subscribe('AUTH_USER_REPLY');
		console.log("SGB: listening to AUTH_USER_REPLY message");
		client.publish('AUTH_USER', '0x32Be343B94f860124dC4fEe278FDCBD38C102D88');
		
		 
		client.on('message', function (topic, message) {
		  // message is Buffer 
		  console.log("Message from edge-hub: "+message.toString());
		  
		});

	});





module.exports = router;
