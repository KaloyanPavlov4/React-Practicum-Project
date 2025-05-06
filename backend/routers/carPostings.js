import express from 'express'
import User from '../models/User.js'
import CarPosting from '../models/CarPostings.js'
import { userExtractor } from '../utils/middleware.js'

const router = express.Router()

router.get('/', async(req, res) => {
  res.json(await CarPosting.find({}))
})

router.get('/:id', async (req, res) => {
  res.json(await CarPosting.findById(req.params.id))
})

router.post('/', userExtractor, async (req, res) => {
  const { brand, model, yearOfProduction, horsePower, transmission, images } = req.body
  const userId = req.user.id

  const carPosting = new CarPosting({ 'brand': brand, 'model': model, 'yearOfProduction': yearOfProduction, 'horsePower': horsePower, 'transmission': transmission, 'images': images, 'by': userId })
  await carPosting.save()

  const user = await User.findById(userId)
  user.carPostings.push(carPosting)
  await user.save()

  res.json(carPosting)
})

router.delete('/:id', async (req, res) => {
  const carPosting = await CarPosting.findById(req.params.id)
  const user = req.user

  if(carPosting.by.toString() !== user._id.toString()){
    return res.status(403).json( { error:'Car posting\'s user doesn\'t match the provided token' })
  }

  await carPosting.deleteOne()
  user.carPostings = user.carPostings.filter(carPost => carPost._id !== req.params.id)
  await user.save()
  res.status(204).end()
})

export default router