import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
  IconButton,
} from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

const CarAdvertForm = ({ user }) => {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    horsepower: '',
    transmission: '',
    fuel: '',
    description: '',
    images: [''],
  })

  if(!user) {
    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 15 }}>
        <Typography variant='h3'>
          Please login/register to upload new car postings!
        </Typography>
      </Paper>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index, value) => {
    const newImages = [...form.images]
    newImages[index] = value
    setForm((prev) => ({ ...prev, images: newImages }))
  }

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ''] }))
  }

  const removeImageField = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 15 }}>
      <Typography variant="h5" gutterBottom>
        Create Car Advert
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Brand" name="brand" fullWidth margin="normal" value={form.brand} onChange={handleChange} required />
        <TextField label="Model" name="model" fullWidth margin="normal" value={form.model} onChange={handleChange} required />
        <TextField label="Year of Production" name="year" type="number" fullWidth margin="normal" value={form.year} onChange={handleChange} required />
        <TextField label="Mileage (km)" name="mileage" type="number" fullWidth margin="normal" value={form.mileage} onChange={handleChange} required />
        <TextField label="Horsepower (HP)" name="horsepower" type="number" fullWidth margin="normal" value={form.horsepower} onChange={handleChange} required />

        <TextField
          select
          label="Transmission"
          name="transmission"
          fullWidth
          margin="normal"
          value={form.transmission}
          onChange={handleChange}
          required
        >
          <MenuItem value="manual">Manual</MenuItem>
          <MenuItem value="automatic">Automatic</MenuItem>
        </TextField>

        <TextField
          select
          label="Fuel Type"
          name="fuel"
          fullWidth
          margin="normal"
          value={form.fuel}
          onChange={handleChange}
          required
        >
          <MenuItem value="petrol">Petrol</MenuItem>
          <MenuItem value="diesel">Diesel</MenuItem>
          <MenuItem value="electric">Electric</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
        </TextField>

        <TextField label="Description" name="description" fullWidth margin="normal" value={form.description} onChange={handleChange} multiline>

        </TextField>

        <Box mt={2}>
          <Typography variant="subtitle1">Image URLs</Typography>
          {form.images.map((url, index) => (
            <Box key={index} display="flex" alignItems="center" mt={1}>
              <TextField
                fullWidth
                placeholder={`Image URL #${index + 1}`}
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              <IconButton onClick={() => removeImageField(index)} disabled={form.images.length === 1}>
                <RemoveCircleOutline />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddCircleOutline />} onClick={addImageField} sx={{ mt: 1 }}>
            Add Another Image
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Submit Advert
        </Button>
      </form>
    </Paper>
  )
}

export default CarAdvertForm