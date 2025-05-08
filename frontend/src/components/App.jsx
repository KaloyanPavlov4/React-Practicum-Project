import { BrowserRouter, Routes, Route } from 'react-router'
import Container from '@mui/material/Container'
import Placeholder from './Placeholder'
import Navigation from './Navigation'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import CarAdvertForm from './CarAdvertForm'

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Placeholder />} />
          <Route path='/new' element={<CarAdvertForm />} />
          <Route path='/post/:id' element={<Placeholder/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='*' element={<Placeholder/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
