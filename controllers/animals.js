import { ChatGPTAPI } from 'chatgpt'
import { OPENAI_API_KEY } from '../utils/config.js'
import express, { text } from 'express'
const animalsRouter = express.Router()

const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY
})

animalsRouter.get('/:id', async (request, response) => {
    const animals_request = "From the list of animals: coyotes, bears, deers, squirrels, cats, cougars, lynxs, rabbits\
    Which three animals are most prolific in " + request.params.id + "?\
    The answer should be three words separated by comma."
    try {
        const answer = await api.sendMessage(animals_request)
        animal_models = animals()
        response.status(200).json(animal_models)
    } catch (error) {
        if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }
        response.status(401).end()
    }
})

animalsRouter.get('/:id/info', async (request, response) => {
    const animals_request = "From the list of animals: coyotes, bears, deers, squirrels, cats, cougars, lynxs, rabbits\
    Which three animals are most prolific in " + request.params.id + "?\
    The answer should be three words separated by comma."
    try {
        const animals = await api.sendMessage(animals_request)
        var animal_list = []
        await animals.text.slice(0, -1).split(", ").forEach(async animal => {
            var animal_copy = (' ' + animal).slice(1);
            animal_list.push(animal_copy)
        })
        var animal_info_list = []
        for (const animal of animal_list) {
            const info_request = "Describe the presence of " + animal + " on " + request.params.id + ".\
            The response should be no longer than 20 words."
            const animal_info = await api.sendMessage(info_request)
            var animal_name = (' ' + animal).slice(1)
            var animal_info_copy = (' ' + animal_info.text).slice(1)
            var animal_info_pack = {
                name: animal_name,
                info: animal_info_copy
            }
            animal_info_list.push(animal_info_pack)
        }
        response.status(200).send(animal_info_list)
    } catch (error) {
        if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message);
        }
        response.status(404).end()
    }
})

export default animalsRouter