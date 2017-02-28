The project has 3 components:

1. Telegram- the component that interacts with telegram bot and blockchains (via web3)
2. Backend - the nodejs component that handles the backend (MVC)
3. MQTT - the mqtt application that listens to the mqtt requests and responses

The config.json file has the following format:

{ "key" : "<your telegram api key>", "rpc_server" : "http://<ip of remote server running geth rpc api >:<port>" }

It should be in this project root.