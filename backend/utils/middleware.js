import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const SECRET = process.env.SECRET

export const userExtractor = async (req, res, next) => {
  const authorization = req.cookies.authtoken
  console.log(authorization)
  const decodedToken = jwt.verify(authorization, SECRET)
  if(!decodedToken.id) {
    return res.status(401).json({ error:'invalid token' })
  }
  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}