import { MONGODB_URI } from './utils/config.js'
import express from 'express'
const app = express()
import cors from 'cors'

import examplesRouter from './controllers/examples.js'
import echoRouter from './controllers/echo.js'
import animalsRouter from './controllers/animals.js'
import infosRouter from './controllers/infos.js'
import ratingsRouter from './controllers/ratings.js'
import artsRouter from './controllers/art.js'

import { connect } from 'mongoose'

console.log('connecting to', MONGODB_URI)

connect(MONGODB_URI)
    .then(() => { console.log('connected to', MONGODB_URI) })
    .catch(error => { console.log('error connecting to MongoDB:', error.message) })

app.use(cors())
app.use(express.static('build'))
app.use(express.static('public'))
app.use(express.json())

app.use('/api/examples', examplesRouter)
app.use('/api/echo', echoRouter)
app.use('/api/animals', animalsRouter)
app.use('/api/infos', infosRouter)
app.use('/api/ratings', ratingsRouter)
app.use('/api/arts', artsRouter)

export default app