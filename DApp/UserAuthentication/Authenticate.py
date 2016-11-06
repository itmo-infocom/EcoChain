# from web3 import Web3, TestRPCProvider

# # Initialising a Web3 instance with an RPCProvider:
# web3rpc = Web3(TestRPCProvider())

# # or specifying host and port.
# web3rpc = Web3(TestRPCProvider(host="127.0.0.1", port="8545"))


# test = web3.eth.getBalance('0x2910543af39aba0cd09dbb2d50200b3e800a63d2');

# print test

from web3 import Web3, TestRPCProvider

# Initialising a Web3 instance with an RPCProvider:
web3rpc = Web3(TestRPCProvider())

# or specifying host and port.
web3rpc = Web3(TestRPCProvider(host="127.0.0.1", port="8545"))

print str(web3rpc.eth.accounts())