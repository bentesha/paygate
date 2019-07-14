'use strict'

const Knex = require('knex')

exports.init = init

/**
 * 
 * @param {import('.')} app - Application instance 
 */
function init(app) {
  return Knex({
    client: 'mysql',
    connection: app.config.mysql,
    pool: {
      min: 2,
      max: 10
    }
  })
}