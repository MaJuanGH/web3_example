# web3_example
步骤

1、安装nodejs

`curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`

`sudo apt-get install -y nodejs`


2、设置npm淘宝镜像

`sudo npm config set registry https://registry.npm.taobao.org`


3、npm安装cnpm

`sudo npm i -g cnpm`


4、cnpm安装ganache-cli或ethereumjs-testrpc、solc、web3@0.20.3

`sudo cnpm i -g  ganache-cli`

`sudo cnpm i -g  ethereumjs-testrpci`

`sudo cnpm i -g  solc`

`sudo cnpm i -g  web3@0.20.3`


5、导出node path

`export NODE_PATH=/usr/lib/node_modules`


6、node执行脚本

`node example.js`
