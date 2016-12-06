var express = require('express');
var router = express.Router();
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
/*var Web3 = require('web3');
var awsIP = "http://54.203.224.250";
var awsPort = "5678";
var blockChainRpcUrl = awsIP+":"+awsPort;
var web3 = new Web3(new Web3.providers.HttpProvider(blockChainRpcUrl));*/


router.get('/', function(req, res) {

	
	client.subscribe('AUTH_USER');
	console.log("Edge-hub listening to AUTH_USER");  
	

	client.on('message', function(topic, message){  
	  
	    console.log("Message from SGB: "+message.toString());
	    
	    var account = message.toString();
	    //rpc to remote block chain made here
	   /* var balance = web3.eth.getBalance(account);*/
	    var response = "Open : false";
	    /*if(balance >= 1){
	    	response = "Open : true";
	    }*/

	    client.publish('AUTH_USER_REPLY',response);

	});

});









module.exports = router;
