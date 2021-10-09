const { config } = require('dotenv')

config()

module.exports = {
  BASE_URL_API: process.env.BASE_URL_API,
}
