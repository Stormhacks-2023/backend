const echoRouter = require('express').Router()

echoRouter.get('/', async(request, response)=>{
    response.status(200).send('Hello')
})

echoRouter.post('/', async(request, response)=>{
    mname = request.body.name
    ret = {
        name: mname
    }
    response.status(201).json(ret)
})

module.exports=echoRouter