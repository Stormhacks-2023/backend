const fs = require('fs')
const png = require("upng-js")
const echoRouter = require('express').Router()

echoRouter.get('/', async(request, response)=>{
    response.status(200).send('Hello')
})

echoRouter.get('/topo/:id', async(request, response)=>{
    mountain_name = request.params.id
    topo_path = "./public/images/" + mountain_name + ".png"
    try {
        mountain_topo_raw = await fs.promises.readFile(topo_path, 'utf-8', {})
        mountain_topo = mountain_topo_raw
        console.log("Topo found!")
        response.setHeader('content-type', 'image/png').status(201).json(mountain_topo)
    } catch (err) {
        console.log(err)
        response.status(404)
    }
})

module.exports = echoRouter