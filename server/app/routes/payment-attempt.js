'use strict'

const express = require('express')
const Joi = require('joi')

module.exports = init

/**
 * @param {import('..')} app 
 */
function init(app) {
  const router = express.Router()

  router.get('/:id', ({ params }, response, next) => {
    (async () => {
      const result = await app.dao.paymentAttempt.getById(params.id)
      if(!result) {
        response.sendStatus(404)
      } else {
        response.json(result)
      }
    })().catch(next)
  })

  router.put('/:id', ({ params, body }, response, next) => {
    (async () => {
      const allowedStatus = ['ON_PROGRESS', 'CONFIRMED']
      const schema = {
        paymentMethod: Joi.string().allow('TIGO_PESA'), // Currently only TigoPesa is supported
        phoneNumber: Joi.string(),
        amount: Joi.number().min(1),
        status: Joi.string().allow(allowedStatus)
      }
      const values = await app.helpers.validateObject(body, schema)
      const attempt = await app.dao.paymentAttempt.getById(params.id)
      if(!attempt) {
        return response.sendStatus(404)
      }
      if(!allowedStatus.includes(attempt.status)) {
        // Allow update only if current status is ON_PROGRESS or CONFIRMED
        return response.status(400).send('Status cannot be updated at this stage')
      }
      const result = await app.dao.paymentAttempt.update(params.id, values)
      response.json(result)
    })().catch(next)
  })

  router.post('/:id/send-request', ({ params }, response, next) => {
    (async () => {
      const attempt = await app.dao.paymentAttempt.getById(params.id)
      if(!attempt) {
        response.sendStatus(404)
      }
      if(attempt.status !== 'CONFIRMED') {
        // Payment request can only be sent if status is CONFIRMED
        return response.status(400).send('Payment request cannot be submitted at this stage')
      }

      // TODO Send payment request

      const result = await app.dao.paymentAttempt.update(params.id, { status: 'REQUEST_PENDING' })
      response.json(result)
    })().catch(next)
  })

  router.post('/:id/resend-request', ({ params }, response, next) => {
    (async () => {
      const attempt = await app.dao.paymentAttempt.getById(params.id)
      if(!attempt) {
        return response.sendStatus(404)
      }
      if(attempt.status != 'FAILED') {
        return response.status(400).send('Payment request cannot be resent at this stage')
      }

      const cloned = await app.dao.paymentAttempt.createCopy(params.id)

      // TODO Send payment request

      const result = await app.dao.paymentAttempt.update(cloned.id, { status: 'REQUEST_PENDING' })
      response.json(result)
    })().catch(next)
  })

  return router
}