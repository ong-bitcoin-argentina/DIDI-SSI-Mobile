const express = require('express')
const bodyParser = require('body-parser')
const ngrok = require('ngrok')
const decodeJWT = require('did-jwt').decodeJWT
const { Credentials } = require('uport-credentials')
const transports = require('uport-transports').transport
const message = require('uport-transports').message.util

let endpoint = ''
const app = express();
app.use(bodyParser.json({ type: '*/*' }))

//setup Credentials object with newly created application identity.
const credentials = new Credentials({
  appName: 'Login Example',
  did: 'did:ethr:0x13e1e0ce2fce63e386b72e60b9ad06cc98d425e9',
  privateKey:
   '6e9208d54dd9d8f0d9a820ad0417b4ef8d784d82aa050d8229fa1703a2c93f33'
})