const examplesRouter = require('express').Router()
const Example = require('../models/example')
const logger = require('../utils/logger')

// CRUD: Read
examplesRouter.get('/', async (request, response) => {
    logger.info("Getting all example entries from database...")
    const examples = await Example
        .find({})
    response.json(examples)
})

// CRUD: Create
examplesRouter.post('/', async (request, response) => {
    logger.info("Adding new example entry to database...")
    body = request.body
    const example = new Example(body)
    result = await example.save()
    response.status(201).json(result)
})

// CRUD: Delete
examplesRouter.delete('/:id', async (request, response) => {
    logger.info("Deleting example entry from database by id...")
    await Example.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// CRUD: Update
examplesRouter.put('/:id', async (request, response) => {
    logger.info("Updating example entry in database by id...")
    const body = request.body
    const changedExample = {
        id: body.id,
        some_attribute: body.some_attribute,
        some_other_attribute: body.some_other_attribute
    }
    updatedExample = await Example.findByIdAndUpdate(request.params.id, changedExample, { new: true })
    response.status(204).json(updatedExample)
})

module.exports = examplesRouter