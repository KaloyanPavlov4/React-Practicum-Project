import express from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET

const router = express.Router()

router.use((req, _res, next) => {
  if(!req.body) throw new Error('Missing body!')
  if(!(req.body.username && req.body.password)) {
    throw new Error('Missing username, password!')
  }

  next()
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ 'username': username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

  if(!(user && passwordCorrect)) {
    return res(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60 })

  res.cookie('authtoken', `${token}`, { maxAge: 3600, httpOnly: true }).status(200).send()
})

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body

  if(!req.body.phoneNumber) {
    throw new Error('Missing phone number!')
  }

  const { phoneNumber } = req.body

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ 'username':username, 'password': passwordHash, 'phoneNumber':phoneNumber, 'carPostings':[] })

  try {
    await user.save()
  } catch (error) {
    next(error)
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60 })

  res.cookie('authtoken', `${token}`, { maxAge: 3600, httpOnly: true }).status(200).send()
})

export default router