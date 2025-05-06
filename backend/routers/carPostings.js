import express from 'express'
import User from '../models/User.js'
import CarPosting from '../models/CarPostings.js'
import { userExtractor } from '../utils/middleware.js'

const router = express.Router()

const checkCarPosting = (req, _res, next) => {
  if(!req.body) throw new Error('Missing body!')
  if(!(req.body.brand && req.body.model && req.body.yearOfProduction && req.body.mileage && req.body.transmission)) {
    throw new Error('Missing brand, model, year of production, mileage or transmission')
  }
  next()
}

router.get('/', async (req, res) => {
  res.json(await CarPosting.find({}))
})

router.get('/:id', async (req, res) => {
  res.json(await CarPosting.findById(req.params.id).populate('by', { username:1, phoneNumber:1 }))
})

router.post('/', userExtractor, checkCarPosting, async (req, res) => {
  const { brand, model, yearOfProduction, mileage, transmission } = req.body
  const userId = req.user.id

  const horsePower = req.body.horsepower ? req.body.horsepower : null
  const images = req.body.images ? req.body.images : null

  const carPosting = new CarPosting({ 'brand': brand, 'model': model, 'yearOfProduction': yearOfProduction, 'mileage': mileage, 'horsePower': horsePower, 'transmission': transmission, 'images': images, 'by': userId })
  await carPosting.save()

  const user = await User.findById(userId)
  user.carPostings.push(carPosting)
  await user.save()

  res.json(carPosting)
})

router.delete('/:id', userExtractor, async (req, res) => {
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