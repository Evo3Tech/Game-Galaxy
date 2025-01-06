import './App.css'
import { Navbar } from './components/hero_page/Navbar.jsx'
import { Content } from './components/hero_page/Content.jsx'
import { useSelector } from 'react-redux'
import User_App from './components/user_page/UserApp.jsx'
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
