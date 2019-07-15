'use strict'

const _ = require('lodash')

module.exports = init

/**
 * 
 * @param {import('../..')} app - Application instance 
 */
function init(/*app*/) {
  return (error, request, response, next) => {
    (async () => {
      if(error && error.isJoi) {
        response.status(400).send(_.get(error, 'details[0].message'))
      } else {
        next(error)
      }
    })().catch(next)
  }
}