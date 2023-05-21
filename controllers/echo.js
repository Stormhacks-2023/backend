const fs = require('fs')
const png = require("upng-js")
const echoRouter = require('express').Router()
const config=require('../utils/config')
echoRouter.get('/', async(request, response)=>{
    var echoDB;
    const iframestr='https://api.echo3D.com/webar?secKey=Izkby9ofQngS4y0HofpxZOAJ&key=wandering-tooth-7184&entry='
    // Query echo3D
    fetch('https://api.echo3D.com/query?secKey='+config.SEC_KEY+'&key=' + config.API_KEY)
    .then((response) => response.json())
    .then((json) => {
    // Store database
    response.status(200).send(Object.keys(json.db))
    })
    .catch((error) => {
    console.error('here',error);
    });
    response.status(404).send('Notworking')
})

echoRouter.get(('/search/:name'),async(req,res)=>{
    const name=req.params.name
    const searchlink='https://api.echo3D.com/search?secKey=Izkby9ofQngS4y0HofpxZOAJ&key=wandering-tooth-7184&keywords='+name
    const response= await fetch(searchlink)
    console.log(response)
    const found =response.find(pic=>{
        if(pic.source==='poly'){
            return pic
        }
    })
    console.log(found)


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