import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.get('/', async (req, res) => {
  res.json(await User.find({}))
})

router.get('/:id', async (req, res) => {
  res.json(await User.findById(req.params.id).populate('carPostings'))
})

export default router