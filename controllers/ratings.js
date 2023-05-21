import Rating from '../models/rating.js'

import express from 'express'
const ratingsRouter = express.Router()

// Get all ratings for a mountain from DB
ratingsRouter.get('/:id', async (request, response) => {
    const ratings = await Rating.find({mountain: request.params.id})
    response.status(200).json(ratings)
})

// Add a rating for a mountain to DB
ratingsRouter.post('/', async (request, response) => {
    const rating = new Rating(request.body)
    const result = await rating.save()
    response.status(201).json(result)
})

export default ratingsRouter