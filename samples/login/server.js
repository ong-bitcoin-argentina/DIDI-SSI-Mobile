const express = require('express');
const ngrok = require('ngrok');
const path = require('path');

//setup boilerplate
let endpoint = ''
const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));  //serve static html 
});

// run the app server and tunneling service
const server = app.listen(8088, () => {
  ngrok.connect(8088).then(ngrokUrl => {
    endpoint = ngrokUrl
    console.log(`Your app is being served!, open at ${endpoint} and scan the QR to login!`)
  })
})