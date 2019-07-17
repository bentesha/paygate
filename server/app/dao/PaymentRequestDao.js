'use strict'

const _ = require('lodash')

class PaymentRequestDao {

  /**
   * Constructor
   * @param {import('..')} app - Application instance 
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * @typedef {object} PaymentRequest
   * @property {string} id
   * @property {Date} createdOn
   * @property {Date} updatedOn
   * @property {string} returnUrl
   * @property {string} status
   * @property {number} amount
   * @property {string} phoneNumber
   * @property {string} paymentMethod
   */

  /**
   * Adds new payment request into the database
   * @param {object} values - Payment request option
   * @param {string} values.returnUrl - A url to redirect to after payment is complete
   * @param {string} values.reference - An optional string reference
   * @return {PaymentRequest} Payment request
   */
  async create(values = {}) {
    // TODO Validate PaymentRequestDao::create() function arguments
    const now = this.app.helpers.getCurrentDateTime();

    const request = {
      returnUrl: values.returnUrl,
      id: this.app.helpers.generateId(),
      createdOn: now,
      updatedOn: now,
      status: 'ON_PROGRESS',
      reference: values.reference === undefined ? '' : values.reference
    }

    await this.app.knex
      .into('payment_request')
      .insert(request)
    
    // Return the inserted payment request
    return this.app.knex
      .from('payment_request')
      .where({ id: request.id })
      .first()
  }

  /**
   * Returns a payment request by its id
   * @param {string} id - Payment request id 
   * @return {PaymentRequest} - Payment request
   */
  async getById(id) {
    if(!id) { return null }
    return this.app.knex
      .from('payment_request')
      .where({ id })
      .first()
  }

  /**
   * Update payment request
   * @param {string} id - Id of the payment request to update 
   * @param {PaymentRequest} values - Payment requet details
   * @return {PaymentRequest} Updated payment request
   */
  async update(id, values = {}) {
    // TODO Validate PaymentRequestDao::update() function arguments
    const updatableFields = [
      'createdOn',
      'updatedOn',
      'returnUrl',
      'status',
      'amount',
      'phoneNumber',
      'paymentMethod'
    ]
    const fields = _.pick(values, updatableFields)
    await this.app.knex
      .into('payment_request')
      .where({ id })
      .update(fields)

    return this.app.knex
      .from('payment_request')
      .where({ id })
      .first()
  }
}

module.exports = PaymentRequestDao