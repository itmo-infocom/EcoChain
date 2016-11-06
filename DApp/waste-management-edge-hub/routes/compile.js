var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var fileReader = require('fs');
var fileEncoding = "utf8";
var Web3 = require('web3');
var remoteIP = "http://54.201.222.80";
var remotePort = "5678";
var web3 = new Web3(new Web3.providers.HttpProvider(remoteIP+":"+remotePort));

/* GET home page. */

router.get('/:contractFileName', function(req, res) {
  

	var contractFileName = req.params.contractFileName;
	var contractFilePath = appRoot + "/contracts/" + contractFileName+".sol";
	var contractWithoutLineBreaks = ""; // the contract from sol file after removing the line breaks will be added here
	fileReader.readFile(contractFilePath,fileEncoding,function(error,data){

		if(error){

			console.log('error reading file: '+contractFilePath);
			process.exit();
		}

		contractWithoutLineBreaks = data.replace(/(\r\n|\n|\r)/gm,"");
		var compileMessage = web3.eth.compile.solidity(contractWithoutLineBreaks);
		console.log(compileMessage);

		res.render('contract', { title: "Contract content", contract: compileMessage });
	});
		
});

module.exports = router;
