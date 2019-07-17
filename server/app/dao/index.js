'use strict'

const PaymentRequestDao = require('./PaymentRequestDao')
const PaymentAttemptDao = require('./PaymentAttempDao')
const PaymentSession = require('./PaymentSessionDao')

exports.init = init

/**
 * 
 * @param {import('..')} app - Application instance
 */
function init(app) {
  return {
    paymentRequest: new PaymentRequestDao(app),
    paymentAttempt: new PaymentAttemptDao(app),
    paymentSession: new PaymentSession(app)
  }
}