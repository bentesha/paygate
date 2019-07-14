'use strict'

const uuid = require('uuid')
const moment = require('moment')

exports.init = init

/**
 * A class that provides commit utility functions
 */
class Helpers {

  /**
   * Regenerate a random unique id string
   * @return {string} - A random unique id
   */
  generateId() {
    return uuid()
  }

  /**
   * Returns current date time string in format 'YYYY-MM-DD HH:mm:ss'
   * @return {string} current date time
   */
  getCurrentDateTime() {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

}

function init() {
  return new Helpers()
}