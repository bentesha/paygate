'use strict'

const uuid = require('uuid')
const moment = require('moment')
const Joi = require('joi')

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

  /**
   * Validates an object against a given Joi schema
   * @param {*} object 
   * @param {*} schema 
   * @return {*} The validated object
   */
  async validateObject(object, schema) {
    return new Promise((resolve, reject) => {
      const { error, value } = Joi.validate(object, schema)
      if(error) {
        reject(error)
      } else {
        resolve(value)
      }
    })
  }

}

function init() {
  return new Helpers()
}