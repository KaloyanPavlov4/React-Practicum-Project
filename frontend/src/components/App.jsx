import { BrowserRouter, Routes, Route } from 'react-router'
import Container from '@mui/material/Container'
import Navigation from './Navigation'
import Notification from './Notification'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import CarAdvertForm from './CarAdvertForm'
import { useState } from 'react'
import CarList from './CarList'
import CarDetails from './CarDetails'
import NotFound from './NotFound'

function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  return (
    <Container>
      <BrowserRouter>
        <Navigation user={user} setUser={setUser} setNotification={setNotification}/>
        <Notification notification={notification}/>
        <Routes>
          <Route path='/' element={<CarList/>} />
          <Route path='/new' element={<CarAdvertForm user={user} setNotification={setNotification} />} />
          <Route path='/post/:id' element={<CarDetails loggedInAs={user}/>}/>
          <Route path='/login' element={<LoginForm user={user} setUser={setUser} setNotification={setNotification}/>}/>
          <Route path='/register' element={<RegisterForm user={user} setUser={setUser} setNotification={setNotification} />} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
