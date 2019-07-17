'use strict'

const updatePaymentStatus = require('../use-cases/update-payment-status')

module.exports = async function({ data: result }) {
  /** @type {import('..')} */
  const app = this

  await updatePaymentStatus(app, result.reference, result.success, result.transactionId)
}
