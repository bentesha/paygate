'use strict'

exports.init = init


function init() {
  const epxress = require('express')
  const morgan = require('morgan')
  const bodyParser = require('body-parser')

  const routes = require('./routes')

  const expressApp = epxress()
  expressApp.use(morgan('combined'))
  expressApp.use(bodyParser.json())
  expressApp.use('/api/', routes)

  return expressApp
}

