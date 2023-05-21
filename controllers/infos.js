import { ChatGPTAPI } from 'chatgpt'
import { OPENAI_API_KEY } from '../utils/config.js'
import express from 'express'
const infosRouter = express.Router()

const api = new ChatGPTAPI({
    apiKey: OPENAI_API_KEY
})

infosRouter.get('/:id', async (request, response) => {
    request = "Provide a description of " + request.params.id + " for tourists, \
    the response should be no more than 200 words. Do not include a conclusion."
    try {
        const info = await api.sendMessage(request)
        response.status(200).send(info.text)
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        response.status(401).end()
    }
})

export default infosRouter