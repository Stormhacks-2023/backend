require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
const API_KEY=process.env.API_KEY
const SEC_KEY=process.env.SEC_KEY
module.exports = {
  MONGODB_URI,
  PORT,
  API_KEY,
  SEC_KEY
}