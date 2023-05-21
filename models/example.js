import { Schema, model } from 'mongoose'

const exampleSchema = new Schema({
  id: String,
  some_attribute: String,
  some_other_attribute: Number,
  nlist: {
    type: Schema.Types.ObjectId,
    ref: 'otherObject'
  }
})

exampleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default model('Example', exampleSchema)