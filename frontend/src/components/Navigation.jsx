import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import { Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  MenuItem,
  Drawer,
  Menu } from  '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useNavigate } from 'react-router'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}))

const Navigation = ({ user, setUser, setNotification }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const openLoginRegister = Boolean(anchorEl)
  const nav = useNavigate()

  const goTo = (to) => {
    setOpen(false)
    return nav(to)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (path) => {
    setAnchorEl(null)
    if (path) goTo(path)
  }

  const logout = () => {
    setUser(null)
    setNotification({ message: 'You have logged out!', type:'success' })
    setTimeout(() => setNotification(null), 4000)
    goTo('/')
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
      data-testid='navigation'
    >
      <Container maxWidth='lg'>
        <StyledToolbar variant='dense' disableGutters>
          <Button sx={{ mr: 3 }} color='primary' onClick={() => goTo('/')}>Home</Button>
          <Box sx={{ flexGrow: 1, display: { xs:'none', md:'flex' }, alignItems: 'center', px: 0 }}>
            <Button variant='text' color='primary' size='small' onClick={() => goTo('/new')}>
                New Post
            </Button>
            {!user && <Box sx={{ ml: 'auto' }} >
              <Button variant='text' color='primary' size='small' onClick={handleClick}>
                Login/Register
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={openLoginRegister}
                onClose={() => handleClose(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => handleClose('/login')}>Login</MenuItem>
                <MenuItem onClick={() => handleClose('/register')}>Register</MenuItem>
              </Menu>
            </Box>}
            {user && <Button sx={{ ml:'auto' }} variant='text' color='primary' size='small' onClick={logout}>
                Logout
            </Button> }
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <IconButton aria-label='Menu button' onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='top'
              open={open}
              onClose={() => setOpen(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={() => setOpen(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem onClick={() => goTo('/new')}>New Post</MenuItem>
                {!user && <MenuItem onClick={() => goTo('/login')}>Login</MenuItem>}
                {!user && <MenuItem onClick={() => goTo('/register')}>Register</MenuItem>}
                {user && <MenuItem onClick={logout}>Logout</MenuItem>}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

export default Navigation