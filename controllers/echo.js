const echoRouter = require('express').Router()
echoRouter.get('/',async(request,respond)=>{
    respond.status(200).send('Hello')
})
module.exports=echoRouter