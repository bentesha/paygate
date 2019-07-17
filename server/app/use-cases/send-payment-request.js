'use strict'

/**
 * @param {import('../.')} app - Application instance
 * @param {string} sessionId - Payment session id
 */
module.exports = async function(app, sessionId) {
  let session = await app.dao.paymentSession.getById(sessionId)
  if(!session) {
    return null
  }
  let attempt = await app.dao.paymentAttempt.getPending(sessionId)
  if(attempt) {
    return session
  }

  attempt = await app.dao.paymentAttempt.create({
    paymentSessionId: sessionId
  })

  const chargeRequest = {
    msisdn: '255' + session.phoneNumber.slice(1),
    amount: session.amount,
    reference: attempt.id
  }

  await app.jobs.addChargeRequest(chargeRequest)

  // Create a timer to fail the payment session if charge result is not received
  // within a given timeframe.
  // If this timer fires before charge result is received, session status will
  // be updated to 'FAILED'
  const timerData = { type: 'session', sessionId: attempt.paymentSessionId }
  await app.jobs.addTimer(timerData, 140 * 1000)

  session = await app.dao.paymentSession.update(sessionId, { status: 'REQUEST_PENDING' })
  await app.dao.paymentRequest.update(session.paymentRequestId, { status: 'REQUET_PENDING' })

  await app.dao.paymentAttempt.update(attempt.id, {
    phoneNumber: session.phoneNumber,
    amount: session.amount,
    paymentMethod: session.paymentMethod
  })

  return session
}