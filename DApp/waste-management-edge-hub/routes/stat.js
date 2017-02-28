var express = require('express');
var router = express.Router();
var Web3 = require('web3');


/*To make sure you don't overwrite the already set provider when in mist, check first if the web3 is available:*/

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
	var web3 = new Web3(new Web3.providers.HttpProvider("http://77.234.202.168:5678"));
}


router.get('/', function(req, res) {
  
  var stats = [["Peer count",getPeerCount()],["Block NUmber",showBlockNumber()],["Account List",showAccountList()],["showCoinBaseBalance",showCoinBaseBalance()]];
  console.log(stats);
  res.render('stat/index', { title: 'Current Statistics ',stat: stats });
});

router.get('/showbalance/:account',function(req,res){
	var account = req.params.account;
	var balance = web3.eth.getBalance(account);
	console.log('Balance in : '+ account + ": " +balance);
	res.send('Balance in : '+ account + ": " +balance);
});



function getPeerCount(){
	var peer = web3.net.peerCount;
 	return peer;
};

function showBlockNumber(){
	var block_number = web3.eth.blockNumber;
	return block_number;
};


function showAccountList(){
	var accounts = web3.eth.accounts;
	return accounts;
};

function showCoinBaseBalance(){
	var coinbase = web3.eth.coinbase;
	var balance = web3.eth.getBalance(coinbase);
	return balance;
	/*web3.eth.getCoinbase(function(error, result){ 
	  	if(error)
	  		return error;
	  	else
	  		return web3.eth.getBalance(result);
  	});*/
};

module.exports = router;

