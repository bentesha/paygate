'use strict'

const updatePaymentStatus = require('../use-cases/update-payment-status')

module.exports = async function({ data }) {
  const sessionId = data.sessionId
  const type = data.type

  /** @type {import('../.')} */
  const app = this
  
  if(type === 'session') {
    const attempt = await app.dao.paymentAttempt.getPending(sessionId)
    if(!attempt) {
      return
    }
    await updatePaymentStatus(app, attempt.id, false)
  }
}
