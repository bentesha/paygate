'use strict'

exports.init = init


function init(app) {
  const express = require('express')
  const morgan = require('morgan')
  const bodyParser = require('body-parser')
  const cors = require('cors')
  const path = require('path')

  const routes = require('./routes')

  const expressApp = express()
  if(app.config.env !== 'test') {
    expressApp.use(morgan('combined'))
  }
  expressApp.use(cors())
  expressApp.use(bodyParser.json())
  expressApp.use(express.static(path.join(app.ROOT_DIR, 'dist')))
  expressApp.use('/api/', routes(app))

  return expressApp
}

