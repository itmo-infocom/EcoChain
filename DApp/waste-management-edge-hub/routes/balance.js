var express = require('express');
var router = express.Router();
var Web3 = require('web3');


/*To make sure you don't overwrite the already set provider when in mist, check first if the web3 is available:*/

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider("http://77.234.202.168:5678"));
}

var test_address = "ad9ffbd06d27d919b2f8d08c9abb5a4a90410eb1";



router.get('/', function(req, res) {
  res.render('index', { title: 'Balance' });
});

router.get('/check', function(req, res) {
  
  /*var coinbase = web3.eth.coinbase;
  var balance = web3.eth.getBalance(coinbase);*/

  //var balance  = /*web3.fromWei(web3.getBalance(web3.coinbase));*/ web3.eth.checkAllBalances();

  /*var coinbase = web3.eth.coinbase;*/
  //var balance = web3.eth.getBalance(test_address);	  
  
  /*res.render('index', { title: 'Balance: '+balance });*/
  //res.send(balance);

  /*web3.eth.getCoinbase(function(error, result){ 

  	if(error)
  		res.send("Error: "+error);
  	else
  		res.send("Result: "+result);

  });*/
  
  //var block = web3.eth.blockNumber;
  var block = web3.eth.accounts;
  var peer = web3.net.peerCount;
  /*res.send(block); */
  console.log("Latest Block: "+peer);

});

module.exports = router;
