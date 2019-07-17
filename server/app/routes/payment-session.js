'use strict'

module.exports = init

/**
 * @param {import('..')} app 
 */
function init(app) {
  const express = require('express')
  const Joi = require('joi')
  
  const router = express.Router()

  router.get('/:id', ({ params }, response, next) => {
    (async () => {
      const session = await app.dao.paymentSession.getById(params.id)
      if(!session) {
        return response.sendStatus(404)
      }
      response.json(session)
    })().catch(next)
  })

  router.put('/:id', ({ params, body }, response, next) => {
    (async () => {
      const session = await app.dao.paymentSession.getById(params.id)
      if(!session) {
        return response.sendStatus(404)
      }
      const schema = {
        paymentMethod: Joi.string().allow('TIGO_PESA'),
        phoneNumber: Joi.string(),
        amount: Joi.number().min(650)
      }
      const values = await app.helpers.validateObject(body, schema)
      const result = await app.dao.paymentSession.update(params.id, values)
      response.json(result)
    })().catch(next)
  })

  router.post('/:id/send-request', ({ params }, response, next) => {
    (async () => {
      const sendPaymentRequest = require('../use-cases/send-payment-request')
      const session = await sendPaymentRequest(app, params.id)
      if(!session) {
        return response.sendStatus(404)
      }
    
      // Update stage
      const result = await app.dao.paymentSession.update(params.id, { status: 'REQUEST_PENDING' })

      response.json(result)
    })().catch(next)
  })
  return router;
}