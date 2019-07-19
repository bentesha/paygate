/* eslint-disable no-console */
const app = require('./server/app')
const axios = require('axios')

app.init()

const returnUrl = 'http://twendeshule.com/payment/48893877373636'
const headers = {
  authorization: app.config.apiKey,
}

const data = {
  returnUrl,
  reference: Math.floor(Math.random() * 1000000000)
}

axios.post('http://payment.twendeshule.com:8080/api/payment-request', data, { headers })
  .then(response => console.log(response.data))
  .catch(console.log)
  .finally(process.exit)