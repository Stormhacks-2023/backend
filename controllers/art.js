import { Configuration, OpenAIApi } from "openai"
import { OPENAI_API_KEY } from '../utils/config.js'
import express, { text } from 'express'
const artsRouter = express.Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

artsRouter.get('/:id', async (request, response) => {
    const art = await openai.createImage({
        prompt: request.params.id,
        n: 1,
        size: "1024x1024",
      })
    response.status(200).send(art.data.data[0].url)
})

export default artsRouter