import Example from '../models/example.js'

import express from 'express'
const examplesRouter = express.Router()

// CRUD: Read
examplesRouter.get('/', async (request, response) => {
    const examples = await find({})
    response.json(examples)
})

// CRUD: Create
examplesRouter.post('/', async (request, response) => {
    body = request.body
    const example = new Example(body)
    result = await example.save()
    response.status(201).json(result)
})

// CRUD: Delete
examplesRouter.delete('/:id', async (request, response) => {
    await findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// CRUD: Update
examplesRouter.put('/:id', async (request, response) => {
    const body = request.body
    const changedExample = {
        id: body.id,
        some_attribute: body.some_attribute,
        some_other_attribute: body.some_other_attribute
    }
    updatedExample = await findByIdAndUpdate(request.params.id, changedExample, { new: true })
    response.status(204).json(updatedExample)
})

export default examplesRouter