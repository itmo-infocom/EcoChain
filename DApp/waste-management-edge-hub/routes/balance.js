var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://54.186.235.186:5678"));
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Balance' });
});

router.get('/check', function(req, res) {
  

  var block = web3.eth.getBalance("0x32Be343B94f860124dC4fEe278FDCBD38C102D88");
  
  res.render('index', { title: 'Latest Block: '+block });

});

module.exports = router;
