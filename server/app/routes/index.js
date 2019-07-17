'use strict'

module.exports = init

/**
 * 
 * @param {import('..')} app - Application instance 
 */
function init(app) {
  const express = require('express')
  const paymentRequest = require('./payment-request')
  // const paymentAttempt = require('./payment-attempt')
  const paymentSession = require('./payment-session')
  const handleValidationError = require('./middleware/handle-validation-error')
  const authenticateApiKey = require('./middleware/authenticate-api-key')

  const router = express.Router()

  router.use('/payment-request', authenticateApiKey(app))
  router.use('/payment-request', paymentRequest(app))
  router.use('/payment-session', paymentSession(app))
  // router.use('/payment-attempt', paymentAttempt(app))

  router.use(handleValidationError(app))

  if(app.config.env === 'test') {
    // Print to console errors during test
    router.use((error, request, response, next) => {
      console.log(error) // eslint-disable-line no-console 
      next(error)
    })
  }
  
  return router
}