import { BrowserRouter, Routes, Route } from 'react-router'
import Container from '@mui/material/Container'
import Placeholder from './Placeholder'

function App() {

  return (
    <Container>
      <BrowserRouter basename="/React-Football-App">
        <Navigation/>
        <Routes>
          <Route path='/' element={<Placeholder />} />
          <Route path='/new' element={<Placeholder />} />
          <Route path='/post/:id' element={<Placeholder/>}/>
          <Route path='/login' element={<Placeholder/>}/>
          <Route path='/register' element={<Placeholder />} />
          <Route path='*' element={<Placeholder/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Container>
  )
}

export default App
