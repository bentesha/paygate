'use strict'

exports.init = init

class Dao {
  /**
   * 
   * @param {import('..')} app - Application instance 
   */
  constructor(app) {
    this.knex = require('knex')({
      client: 'mysql',
      connection: app.config.mysql,
      pool: {
        min: 2,
        max: 10
      }
    })
  }
}

/**
 * 
 * @param {import('..')} app - Application instance
 */
function init(app) {
  return new Dao(app)
}