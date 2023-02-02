import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './pages/login'
import Navbar from './components/common/Navbar'
import { Container } from 'react-bootstrap'
import { useAuth } from './services/login'

function App() {
  const [count, setCount] = useState(0)
  const {status, dataReturn} = useAuth()
  useEffect(() => {
    console.log(useAuth())
  }, []) 

  return (
    <div>
      <Navbar />
      <Container className='py-5'>
        
      </Container>

    </div>
  )
}

export default App
