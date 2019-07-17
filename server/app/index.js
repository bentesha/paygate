/* eslint-disable no-console */
'use strict'

const http = require('http')
const chalk = require('chalk')

class Application {

  /**
   * Initialize application instance
   */
  init() {
    // Load application dependencies
    this.config = require('./config').init(this)
    this.express = require('./express').init(this)
    this.knex = require('./knex').init(this)
    this.dao = require('./dao').init(this)
    this.jobs = require('./jobs')(this)
    this.helpers = require('./helpers').init(this)
  }

  /**
   * Run application instance
   */
  async run() {
    await this.jobs.isReady()
      .catch(error => {
        console.log(chalk.red('Job queue failed to initialize')) 
        console.log(chalk.red(error))
        process.exit(-1)
      })

    // Register workers to process message queues
    this.jobs.processChargeResults(require('./workers/charge-result').bind(this))
    this.jobs.processTimers(require('./workers/timer').bind(this))
    this.jobs.processWebCallbacks(require('./workers/webhook').bind(this))

    // Run web server
    const server = http.createServer(this.express)
    server.listen(this.config.port, () => {
      console.log('Listening on port:', server.address().port) // eslint-disable-line no-console
    })
  }
}

module.exports = new Application()