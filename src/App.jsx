import { useState } from 'react'
import './App.css'
import { Navbar } from './components/hero_page/Navbar'
import { Content } from './components/hero_page/Content'
import { useSelector } from 'react-redux'
import User_App from './components/user_page/UserApp'

function App() {
  const user_info = useSelector((state)=>state.user.info)
  if(user_info){
    return (
      <User_App/>
    )
  }
  
  return (
    <>
      <Navbar />
      <Content/>
    </>
  )
}

export default App
