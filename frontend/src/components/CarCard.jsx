import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import notFoundImage from '../assets/notFound.jpg'

const CarCard = ({ form }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {form.images[0] && (
        <CardMedia
          component="img"
          height="180"
          image={form.images[0]}
          alt={`${form.brand} ${form.model}`}
        />
      )}
      {!form.images[0] && (
        <CardMedia
          component="img"
          height="180"
          image={notFoundImage}
          alt="No image for this post"/>
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {form.brand} {form.model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Year: {form.year} • Mileage: {form.mileage} km
        </Typography>
        <Typography variant="body2" color="text.secondary">
          HP: {form.horsepower} • Transmission: {form.transmission}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fuel: {form.fuel}
        </Typography>
        {form.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {form.description.length > 50
            ? `${form.description.slice(0, 50)}...`
            : form.description}
        </Typography>}
      </CardContent>
    </Card>
  )
}

export default CarCard