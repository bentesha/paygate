'use strict'

const PaymentRequestDao = require('./PaymentRequestDao')

exports.init = init

/**
 * 
 * @param {import('..')} app - Application instance
 */
function init(app) {
  return {
    paymentRequest: new PaymentRequestDao(app)
  }
}