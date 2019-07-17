'use strict'

const Queue = require('bull')

class JobQueue {
  /**
   *
   * @param {import('.')} app - Application instance
   */
  constructor (app) {
    this.app = app
    this.requestQueue = new Queue('payment:request', app.config.redis)
    this.responseQueue = new Queue('payment:response', app.config.redis)
    this.timerQueue = new Queue('timer', app.config.redis)
    this.webhookQueue = new Queue('webhook', app.config.redis)
  }

  /**
   * Waits for the queues to be ready to process messages
   */
  async isReady () {
    await Promise.all([
      this.requestQueue.isReady(),
      this.responseQueue.isReady(),
      this.timerQueue.isReady(),
      this.webhookQueue.isReady()
    ])
  }

  /**
   * Stutdown all queues
   */
  async shutdown () {
    // return this.requestQueue.pause()
  }

  /**
   * The data structure of customer charge request job
   * @typedef {object} ChargeRequest
   * @property {string} msisdn - MSISDN of the customer. Must start with 255 followed by 9 digits
   * @property {number} amount - Amount the customer should be charged
   * @property {string} reference - A reference that can be used to track this request
   */

  /**
   * Add customer charge request into the queue
   * @param {ChargeRequest} request - Charge request
   */
  async addChargeRequest (request) {
    return this.requestQueue.add(request)
  }

  /**
   * Add timer to queue
   * @param {any} timerData - Data to be passed to timer callback
   * @param {number} timeout - Timer timeout value
   */
  async addTimer(timerData, timeout) {
    return this.timerQueue.add(timerData, { delay: timeout })
  }

  async addWebCallback(data) {
    this.webhookQueue.add(data, {
      backoff: 10000, // Delay 10secs between re-attempts
      attempts: 5 // Attempts 5 times if callback fails
    })
  }

  /**
   * 
   * @typedef {object} ChargeResult
   * @property {string} transactionId
   * @property {string} msisdn
   * @property {number} amount
   * @property {string} reference
   * @property {string} description
   */

  /**
   * A callback function that is called to process a charge request
   * @callback callbackFn
   * @param {ChargeResult} result - A charge request to process
   * @return {Promise<void>} Returns a promise that resolves successfully if request was successfully process.
   * The returned promise should resolve with an error if the charge could not be successfully sent
   */

  /**
   * Supply a callback function that should be called to process customer charge results
   * @param {callbackFn} callback
   */
  processChargeResults (callback) {
    this.responseQueue.isReady()
      .then(() => this.responseQueue.process(callback))
      .catch(() => {}) // Do nothing
  }

  processTimers(callback) {
    this.timerQueue.isReady()
      .then(() => this.timerQueue.process(callback))
      .catch(() => {})
  }

  processWebCallbacks(callback) {
    this.webhookQueue.isReady()
      .then(() => this.webhookQueue.process(callback))
      .catch(() => {})
  }
}

/**
 * Initializes an instance of JobQueue class
 * @param {import('.')} app - Application instance
 */
const init = app => {
  return new JobQueue(app)
}

module.exports = init
