import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import CarCard from './CarCard'
import { getAllPosts } from '../services/carAdvertService'

const CarList = () => {
  const [carPosts, setCarPosts] = useState([])

  useEffect(() => {
    getAllPosts().then(data => {
      setCarPosts(data)})
  }, [])

  if(!carPosts) {
    return
  }

  return (
    <Grid container spacing={2} mt={15}>
      {carPosts.map(data => <CarCard key={data.id} form={data}></CarCard>)}
    </Grid>
  )
}

export default CarList