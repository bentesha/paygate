'use strict'

/**
 * @param {import('../.')} app - Application instance
 * @param {string} id - Id of the payment attempt
 * @param {boolean} completed - True if transaction was successfully completed, or false otherwise
 * @param {string} [transactinId] - Transaction id, if transaction was completed successfully
 */
module.exports = async function(app, id, completed, transctionId) {
  const attempt = await app.dao.paymentAttempt.getById(id)
  if(!attempt) { return }

  const now = app.helpers.getCurrentDateTime()

  const values = {
    status: completed ? 'COMPLETED' : 'FAILED',
    responseReceivedOn: now,
    transactinId: transctionId ? transctionId : null,
    paymentMethod: attempt.paymentMethod,
    phoneNumber: attempt.phoneNumber,
    amount: attempt.amount
  }

  await app.dao.paymentAttempt.update(id, values)
  await app.dao.paymentSession.update(attempt.paymentSessionId, values)
  await app.dao.paymentRequest.update(attempt.paymentRequestId, values)
  
  // Perform webhook call to notify client of payment status
  const request = await app.dao.paymentRequest.getById(attempt.paymentRequestId)
  await app.jobs.addWebCallback(request)
}