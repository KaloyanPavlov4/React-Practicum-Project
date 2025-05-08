import React, { useState } from 'react'
import { TextField, Button, Typography, Paper } from '@mui/material'
import { getUserByUsername } from '../services/userService'

const LoginForm = ( { user, setUser, setNotification }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
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
    const toSet = await getUserByUsername(form.username)
    if(toSet === undefined || form.password !== toSet.password) {
      setNotification('User does not exist or wrong password!')
      setTimeout(() => setNotification(''), 4000)
    } else {
      setUser(toSet)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 15 }}>
      <Typography variant="h5" gutterBottom>
        Login
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
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Paper>
  )
}

export default LoginForm