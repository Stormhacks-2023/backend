import { Schema, model } from 'mongoose'

const ratingSchema = new Schema({
    mountain: String,
    name: String,
    text: String,
    score: Number
})

ratingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default model('Rating', ratingSchema)