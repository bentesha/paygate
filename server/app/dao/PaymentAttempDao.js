'use strict'

const _ = require('lodash')

const TABLE_NAME = 'payment_attempt'

class PaymentAttemptDao {

  /**
   * Constructor
   * @param {import('..')} app - Application instance 
   */
  constructor(app) {
    this.app = app
  }

  /**
   * @typedef {object} PaymentAttempt
   * @property {string} id
   * @property {string} paymentSessionId
   * @property {string} paymentRequestId
   * @property {Date} createdOn
   * @property {Date} updatedOn
   * @property {Date} requestSentOn
   * @property {Date} responseReceivedOn
   * @property {string} status
   * @property {string} paymentMethod
   * @property {string} phoneNumber
   * @property {number} amount
   * @property {string} transactionId
   * @property {string} message
   */

  /**
   * Returns a payment attempt record with given id
   * @param {string} id - Id of the record to retrieve
   * @return {PaymentAttempt} Payment attempt record
   */
  async getById(id) {
    if(!id) { return null }
    return this.app.knex
      .from(TABLE_NAME)
      .where({ id })
      .first()
  }

  /**
   * Adds a payment attempt record into the database
   * @param {object} values - Object with key value pairs to add to database
   * @param {string} values.paymentSessionId - Id of the payment session this payment attempt is part of
   */
  async create(values) {
    // TODO validate PaymentAttemptDao::create() arguments
    const now = this.app.helpers.getCurrentDateTime()
    const session = await this.app.dao.paymentSession.getById(values.paymentSessionId)
    if(!session) {
      return null
    }
    const record = {
      id: this.app.helpers.generateId(),
      paymentSessionId: session.id,
      paymentRequestId: session.paymentRequestId,
      createdOn: now,
      updatedOn: now,
      requestSentOn: now,
      status: 'REQUEST_PENDING'
    }

    await this.app.knex
      .into(TABLE_NAME)
      .insert(record)
    
    // return inserted record
    return this.getById(record.id)
  }

  /**
   * Updates a payment attempt record in the database
   * @param {string} id - Id of the record to update
   * @param {PaymentAttempt} values - Key value pairs to update
   */
  async update(id, values) {
    // TODO validate PaymentAttemptDao::update() params
    if(!id) {
      return null;
    }
    const updatableFields = ['status', 'phoneNumber', 'amount', 'paymentMethod', 'responseReceivedOn',
      'transactionId', 'message']
    const record = _.pick(values, updatableFields)
    record.updatedOn = this.app.helpers.getCurrentDateTime()
    
    await this.app.knex
      .from(TABLE_NAME)
      .where({ id })
      .update(record)

    // return updated record
    return this.getById(id)
  }

  /**
   * 
   * @param {*} sessionId 
   * @return {PaymentAttempt}
   */
  async getPending(sessionId) {
    return this.app.knex 
      .from(TABLE_NAME)
      .where({ paymentSessionId: sessionId, status: 'REQUEST_PENDING' })
      .first()
  }

  async createCopy(id) {
    if(!id) { return null }
    const record = await this.getById(id)
    if(!record) { return null }
    record.id = this.app.helpers.generateId()
    const now = this.app.helpers.getCurrentDateTime()
    record.createdOn = now
    record.updatedOn = now
    record.status = 'CONFIRMED',
    record.requestSentOn = null
    record.requestReceivedOn = null

    await this.app.knex
      .into(TABLE_NAME)
      .insert(record)
    
    return this.app.knex
      .from(TABLE_NAME)
      .where({ id: record.id })
      .first()
  }
}

module.exports = PaymentAttemptDao