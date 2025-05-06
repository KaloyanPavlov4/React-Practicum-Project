import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'User with that username already exists'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  phoneNumber: {
    type: String,
    required: true
  },
  carPostings: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'CarPosting'
    }],
    required: true
  }
})

const User = mongoose.model('User', userSchema)

export default User