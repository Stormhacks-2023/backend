import express from 'express'
import { API_KEY, SEC_KEY } from '../utils/config.js'
const echoRouter = express.Router()

echoRouter.get('/', async (request, response) => {
    var echoDB;
    const iframestr = 'https://api.echo3D.com/webar?secKey=Izkby9ofQngS4y0HofpxZOAJ&key=wandering-tooth-7184&entry='
    // Query echo3D
    fetch('https://api.echo3D.com/query?secKey=' + SEC_KEY + '&key=' + API_KEY)
        .then((res) => res.json())
        .then((json) => {
            // Store database
            response.status(200).json(json.db)
        })
        .catch((error) => {
            console.error('here', error);
            response.status(404).send('Notworking')
        });

})

echoRouter.get(('/search/:name'), async (req, res) => {
    const name = req.params.name
    const searchlink = 'https://api.echo3D.com/search?secKey=Izkby9ofQngS4y0HofpxZOAJ&key=wandering-tooth-7184&keywords=' + name
    const response = await fetch(searchlink)
    const newtry = await response.clone().json()
    const found = newtry.find(pic => {
        if (pic.source === 'poly') {
            return pic
        }
    })
    const answer = await fetch('https://api.echo3D.com/upload', {
        Method: 'POST',
        Headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json'
        },
        Body: {
            type: 'search',
            source: 'poly',
            bin_url: found.gltf_bin_url,
            gltf_url: found.gltf_location_url,
            thumbnail: found.thumbnail,
            png_url: found.thumbnail,
            png_path: found.thumbnail,
            name: found.name,
            email: 'jsdhanoa@sfu.ca',
            key: API_KEY,
            secKey: SEC_KEY

        },
        Cache: 'default'
    })
    // const second =await answer.clone().json()
    console.log(answer)


})

export default echoRouter