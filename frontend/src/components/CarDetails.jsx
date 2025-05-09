import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Button
} from '@mui/material'
import notFoundImage from '../assets/notFound.jpg'
import { getPost } from '../services/carAdvertService'
import { getUser } from '../services/userService'
import { useNavigate } from 'react-router'
import { deletePost } from '../services/carAdvertService'

const CarDetails = ({ loggedInAs }) => {
  const [post, setPost] = useState(null)
  const [user, setUser] = useState({})
  const params = useParams()
  const nav = useNavigate()
  const id = params.id

  useEffect(() => {
    getPost(id).then(data => {
      setPost(data)
      getUser(data.userId).then(by => setUser(by))
    })
  }, [id])

  const deleteCarPost = async () => {
    await deletePost(post.id)
    return nav('/')
  }

  if(!post) return


  return (
    <Box sx={{ p: 4 }} mt={15}>
      <Paper elevation={3} sx={{ mb: 4 }}>
        {post.images[0] && <img
          src={post.images[0]}
          alt={`${post.brand} ${post.model}`}
          style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }}
        />}
        {!post.images[0] && <img
          src={notFoundImage}
          alt={`${post.brand} ${post.model}`}
          style={{ width: '100%', maxHeight: 500, objectFit: 'cover' }}
        />}
      </Paper>

      <Typography variant="h4" gutterBottom>
        {post.brand} {post.model} ({post.year})
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {post.mileage} km • {post.horsepower} HP • {post.transmission} • {post.fuel}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Description</Typography>
      <Typography variant="body1" color="text.primary" paragraph>
        {post.description || 'No description provided.'}
      </Typography>

      {post.images.length > 1 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>More Images</Typography>
          <Grid container spacing={2}>
            {post.images.slice(1).map((img, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={2}>
                  <img
                    src={img}
                    alt={`Additional image ${index + 1}`}
                    style={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Typography variant="h6" gutterBottom>Phone number</Typography>
      <Typography variant="body1" color="text.primary" paragraph>
        {user.phone}
      </Typography>
      {loggedInAs && loggedInAs.id === post.userId && <Button onClick={deleteCarPost} variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Delete
      </Button>}
    </Box>
  )
}

export default CarDetails