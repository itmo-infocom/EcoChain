var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
 

router.get('/', function(req, res) {

	/*console.log("runs");
	client.on('connect', function () {*/
	  client.subscribe('presence');
	  client.publish('presence', 'Hello mqtt');
	  /*console.log('connected');
	});*/
	
	client.on('connect',function(){

		console.log('connected');

	});

	client.on('message', function (topic, message) {
	  // message is Buffer 
	  console.log(message.toString());
	  client.end();
	});
});
module.exports = router;