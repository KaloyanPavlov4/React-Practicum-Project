import { BrowserRouter, Routes, Route } from 'react-router'
import Container from '@mui/material/Container'
import Placeholder from './Placeholder'
import Navigation from './Navigation'
import RegisterForm from './RegisterForm'

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Placeholder />} />
          <Route path='/new' element={<Placeholder />} />
          <Route path='/post/:id' element={<Placeholder/>}/>
          <Route path='/login' element={<Placeholder/>}/>
          <Route path='/register' element={<RegisterForm />} />
          <Route path='*' element={<Placeholder/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
