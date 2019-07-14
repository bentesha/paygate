'use strict'

const { config } = require('dotenv');

exports.init = init

/**
 * Load application configurations
 */
function init () {
  config() // Load config from .env file
  return {
    apiKey: process.env.API_KEY,
    env: process.env.NODE_ENV || 'development',

    mysql: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_DATABASE || 'paypage',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    },

    port: process.env.PORT
  }
}