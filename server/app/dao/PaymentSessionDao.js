'use strict'

const _ = require('lodash')

const TABLE_NAME = 'payment_session'

class PaymentSessionDao {
  /**
   * Constructor
   * @param {import('../.')} app - Application instance
   */
  constructor(app) {
    this.app = app
  }

  /**
   * @typedef {object} PaymentSession
   * @property {string} id
   * @property {string} paymentRequestId
   * @property {Date} createdOn
   * @property {Date} updatedOn
   * @property {string} returnUrl
   * @property {string} paymentMethod
   * @property {string} phoneNumber
   * @property {number} amount
   */

  /**
   * Returns a payment session from a database
   * @param {string} id - Payment session id
   * @return {PaymentSession}
   */
  async getById(id) {
    if(!id) { return null }
    return this.app.knex
      .from(TABLE_NAME)
      .where({ id })
      .first()
  }

  /**
   * 
   * @param {object} values
   * @param {string} values.paymentRequestId - Id of the payment request to which this session belongs
   * @param {string} values.returnUrl - Url of the client website to redirect to after payment completion
   * @return {PaymentSession} Instance of the created payment session
   */
  async create(values) {
    // TODO Validate PaymentSession::create() arguments
    const now = this.app.helpers.getCurrentDateTime()
    const session = {
      id: this.app.helpers.generateId(),
      paymentRequestId: values.paymentRequestId,
      createdOn: now,
      updatedOn: now,
      status: 'ON_PROGRESS',
      returnUrl: values.returnUrl
    }

    await this.app.knex
      .into(TABLE_NAME)
      .insert(session)

    // Return inserted record
    return this.getById(session.id)
  }

  /**
   * Update a payment session entry into the database
   * @param {string} id - Id of the entry to update
   * @param {object} values - Key value pairs to update
   * @param {string} values.status - Payment session status s
   * @param {string} values.paymentMethod - Payment method
   * @param {string} values.phoneNumber - Phone number
   * @param {number} values.amount - Amount
   */
  async update(id, values) {
    // TODO Validate PaymentSessionDao::update params
    const updatableFields = ['status', 'phoneNumber', 'paymentMethod', 'amount']
    const session = _.pick(values, updatableFields)
    const now = this.app.helpers.getCurrentDateTime()
    session.updatedOn = now
    if(session.status === 'REQUEST_PENDING') {
      session.requestSentOn = now
    } else if(session.status === 'FAILED' || session.status === 'COMPLETED') {
      session.responseReceivedOn = now
    }

    await this.app.knex
      .from(TABLE_NAME)
      .where({ id })
      .update(session)

    // Return updated record
    return this.getById(id)
  }
}

module.exports = PaymentSessionDao