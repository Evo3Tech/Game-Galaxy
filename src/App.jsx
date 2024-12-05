import { useState } from 'react'
import './App.css'
import { Navbar } from './components/hero_page/Navbar'
import { Content } from './components/hero_page/Content'
import { useSelector } from 'react-redux'
import User_App from './components/user_page/UserApp'
import { Hero_page } from './components/hero_page/Hero_page'
import './animations_css/heropage_animations.css'
function App() {
  const user_info = useSelector((state)=>state.user.info)
  if(user_info){
    return (
      <User_App/>
    )
  }

  
  return (
    <>
      <div className="background_img">
      </div>
      <Navbar />
      <Content/>
    </>
  )
}

export default App
