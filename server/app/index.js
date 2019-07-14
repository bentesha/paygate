'use strict'

const http = require('http')

class Application {

  init() {
    this.config = require('./config').init(this)
    this.express = require('./express').init(this)
    this.dao = require('./dao').init(this)
    this.helpers = require('./helpers').init(this)
  }

  run() {
    const server = http.createServer(this.express)
    server.listen(this.config.port, () => {
      console.log('Listening on port:', server.address().port) // eslint-disable-line no-console
    })
  }
}

module.exports = new Application()