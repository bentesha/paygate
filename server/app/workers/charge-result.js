'use strict'

const updatePaymentStatus = require('../use-cases/update-payment-status')

module.exports = async function({ data }) {
  /** @type {import('..')} */
  const app = this

  await updatePaymentStatus(app, data.reference, true, data.transactionId)
}
