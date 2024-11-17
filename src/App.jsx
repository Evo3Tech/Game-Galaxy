import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Content } from './components/Content'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Content/>
    </>
  )
}

export default App
