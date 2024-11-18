import { useState } from 'react'
import './App.css'
import { Navbar } from './components/hero_page/Navbar'
import { Content } from './components/hero_page/Content'

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
