'use strict'

exports.init = init


function init(app) {
  const epxress = require('express')
  const morgan = require('morgan')
  const bodyParser = require('body-parser')
  const cors = require('cors')

  const routes = require('./routes')

  const expressApp = epxress()
  if(app.config.env !== 'test') {
    expressApp.use(morgan('combined'))
  }
  expressApp.use(cors())
  expressApp.use(bodyParser.json())
  expressApp.use('/api/', routes(app))

  return expressApp
}

