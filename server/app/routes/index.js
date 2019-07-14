'use strict'

module.exports = init

/**
 * 
 * @param {import('..')} app - Application instance 
 */
function init(app) {
  const express = require('express')
  const paymentRequest = require('./payment-request')

  const router = express.Router()

  router.use('/payment-request', paymentRequest(app))

  return router
}

// Add app routes