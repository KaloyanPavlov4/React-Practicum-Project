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
    minlength: [6, 'Password must be at least 6 characters'],
  }
})

const User = mongoose.model('User', userSchema)

export default User