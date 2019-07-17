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
    redirectUrl: process.env.REDIRECT_URL,
    env: process.env.NODE_ENV || 'development',

    webhook: {
      url: process.env.WEBHOOK_URL,
      secret: process.env.WEBHOOK_SECRET
    },

    mysql: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_DATABASE || 'paypage',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    },

    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
      password: process.env.REDIS_PASSWORD
    },

    port: process.env.PORT
  }
}