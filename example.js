let Web3 = require('web3');
let solc = require('solc');
let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let deployeAddr = web3.eth.accounts[0];

//compile
let source = "pragma solidity ^0.4.0;" +
	     "contract Calc{" + 
             "  uint count;" +
             "  function add(uint a, uint b) returns(uint){    count++;    return a + b;  }" +
             "  function getCount() constant returns (uint){    return count;  }}";
let calcCompiled = solc.compile(source);

//contract object
let abi = calcCompiled.contracts[':Calc'].interface;

// creation of contract object
var MyContract = web3.eth.contract(JSON.parse(abi));
console.log(">>MyContract:");
console.log(MyContract);

//bin data
let bytecode = calcCompiled.contracts[':Calc'].bytecode;
console.log("\n>>bytecode:\n" + bytecode);

//depoly
var myContractReturned = MyContract.new({
   from:deployeAddr,
   data:bytecode,
   gas:2000000}, function(err, myContract){
    if(!err) {
       // NOTE: The callback will fire twice!
       // Once the contract has the transactionHash property set and once its deployed on an address.

       // e.g. check tx hash on the first call (transaction send)
       if(!myContract.address) {
           console.log("\n>>myContract.transactionHash" + myContract.transactionHash) 
       
       // check address on the second call (contract deployed)
       } else {
           console.log(">>myContract.address" +myContract.address) 
	   //send transaction
           myContract.add.sendTransaction(1, 2,{
               from: deployeAddr
           });

           console.log("after contract deploy, call:" + myContract.getCount.call());
       }

       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
    }else{
       console.log("\n!!!Error info:" + err);
    }
  });
