import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const API_KEY=process.env.API_KEY
const SEC_KEY=process.env.SEC_KEY

export {
  MONGODB_URI,
  PORT,
  OPENAI_API_KEY,
  API_KEY,
  SEC_KEY

}