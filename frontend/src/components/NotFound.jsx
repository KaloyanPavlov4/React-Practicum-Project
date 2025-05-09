import { useNavigate } from 'react-router'
import { Box, Button, Typography } from '@mui/material'

function NotFound() {
  const nav = useNavigate()

  const goHome = () => {
    return nav('/')
  }

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.primary,
      })}>
      <Typography variant='h1' sx={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant='h6' sx={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant='contained' onClick={goHome}>Back Home</Button>
    </Box>
  )
}

export default NotFound