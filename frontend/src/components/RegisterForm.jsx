import React, { useState } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { getUserByUsername, postUser } from '../services/userService'

const RegisterForm = ( { user, setNotification, setUser } ) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(Object.keys(user).length !== 0) {
      setNotification('You are already logged in!')
      return
    }
    if(!form.username || !form.password || !form.phone) {
      setNotification('All fields are required!')
      setTimeout(() => setNotification(''), 4000)
    } else {
      const otherUser = await getUserByUsername(form.username)
      if(otherUser) {
        setNotification('A user with that username already exists!')
        setTimeout(() => setNotification(''), 4000)
      } else {
        await postUser(form.username, form.password, form.phone)
        setUser({ username: form.username, password: form.password, phone: form.phone })
      }
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 15 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Paper>
  )
}

export default RegisterForm