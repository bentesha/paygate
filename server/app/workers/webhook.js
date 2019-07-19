'use strict'

const axios = require('axios')

module.exports = function({ data: paymentRequest }) {
  /** @type {import('../.')} */
  const app = this

  // Check if webhook and secret is configured
  if(!app.config.webhook.url || !app.config.webhook.secret) {
    return
  }
  const headers = {
    authorization: app.config.webhook.secret
  }
  const data = {
    id: paymentRequest.id,
    status: paymentRequest.status,
    paymentMethod: paymentRequest.paymentMethod,
    amount: paymentRequest.amount,
    phoneNumber: '255' + paymentRequest.phoneNumber.slice(1),
    reference: paymentRequest.reference
  }
  return axios.post(app.config.webhook.url, data, { headers })
    .then(response => response.data)
    .catch(error => {
      if(error.response) {
        return Promise.reject(error.response)
      } else {
        return Promise.reject(error)
      }
    })
}