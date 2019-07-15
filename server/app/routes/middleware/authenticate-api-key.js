'use strict'

const express = require('express')

module.exports = init

/**
 * 
 * @param {import('../..')} app 
 */
function init(app) {
  const router = express.Router()
  router.use((request, response, next) => {
    (async () => {
      const key = request.headers['authorization']
      if(key !== app.config.apiKey) {
        response.sendStatus(401)
      } else {
        next()
      }
    })().catch(next)
  })

  return router
}