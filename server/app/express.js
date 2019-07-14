'use strict'

exports.init = init


function init(app) {
  const epxress = require('express')
  const morgan = require('morgan')
  const bodyParser = require('body-parser')

  const routes = require('./routes')

  const expressApp = epxress()
  expressApp.use(morgan('combined'))
  expressApp.use(bodyParser.json())
  expressApp.use('/api/', routes(app))

  return expressApp
}

