const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
  id: String,
  some_attribute: String,
  some_other_attribute: Number,
  nlist: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Example', exampleSchema)