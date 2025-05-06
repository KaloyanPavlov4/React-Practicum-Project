import mongoose from 'mongoose'
const { Schema } = mongoose

const carPostingSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  yearOfProduction: {
    type: Number,
    required: true
  },
  horsePower: {
    type: Number
  },
  transmission: {
    type: Number
  },
  images: [{
    type: String
  }],
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
})

const CarPosting = mongoose.model('CarPosting', carPostingSchema)

export default CarPosting