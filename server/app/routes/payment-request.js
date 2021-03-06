'use strict'

module.exports = init

/**
 * 
 * @param {import('../.')} app 
 */
function init(app) {
  const express = require('express')
  const Joi = require('joi')
  const _ = require('lodash')

  const router = express.Router()

  /**
   * Removes from payment request object fields that should not be returned by API
   * @param {*} paymentRequest 
   */
  const trim = paymentRequest => {
    return _.pick(paymentRequest, ['id', 'createdOn', 'updatedOn', 'status' ])
  }

  router.post('/', ({ body }, response, next) => {
    (async () => {
      const schema = {
        returnUrl: Joi.string().uri().required(),
        reference: [Joi.string(), Joi.number()]
      }

      const options = await app.helpers.validateObject(body, schema)
      const paymentRequest = await app.dao.paymentRequest.create(options)
      const session = await app.dao.paymentSession.create({
        paymentRequestId: paymentRequest.id,
        returnUrl: paymentRequest.returnUrl
      })
      const result = trim(session)
      result.redirectUrl = app.config.redirectUrl.replace('{id}', session.id)
      response.json(result)
    })().catch(next)
  })

  router.get('/:id', ({ params }, response, next) => {
    (async () => {
      const paymentRequest = await app.dao.paymentRequest.getById(params.id)
      if(!paymentRequest) {
        response.sendStatus(404)
      } else {
        response.json(trim(paymentRequest))
      }
    })().catch(next)
  })

  return router;
}