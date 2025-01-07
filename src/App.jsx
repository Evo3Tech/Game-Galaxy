import './App.css'
import { Navbar } from './components/hero_page/Navbar.jsx'
import { Content } from './components/hero_page/Content.jsx'
import { useDispatch, useSelector } from 'react-redux'
import User_App from './components/user_page/UserApp.jsx'
import './animations_css/heropage_animations.css'
import { useEffect } from 'react'
import { set_all_games } from './redux_store/games/gamesSlice.js'
function App() {
  const user_info = useSelector((state)=>state.user.info)
  const games = useSelector((state)=>state.games)
  const dispatch = useDispatch()
  useEffect(()=>{
    async function get_all_games() {
      try {
        const all_games = await fetch(`https://gamegalaxy-production.up.railway.app/user/all_Games`).then((res)=>res.json())
        dispatch(set_all_games(all_games))
      } catch (error) {
        console.log(error);
      }
    }
    get_all_games()
  }, [])
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
