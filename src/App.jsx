import './App.css'
import { Navbar } from './components/hero_page/Navbar.jsx'
import { Content } from './components/hero_page/Content.jsx'
import { useDispatch, useSelector } from 'react-redux'
import User_App from './components/user_page/UserApp.jsx'
import './animations_css/heropage_animations.css'
import { useEffect } from 'react'
import { set_all_games } from './redux_store/games/gamesSlice.js'
import { log_in } from "./redux_store/user/userSlice.js";
import { useNavigate } from "react-router-dom"

function App() {
  const user_info = useSelector((state)=>state.user.info)
  const games = useSelector((state)=>state.games)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    async function get_all_games() {
      try {
        const all_games = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/all_Games`).then((res)=>res.json())
        dispatch(set_all_games(all_games))
      } catch (error) {
        console.log(error);
      }
    }
    async function check_cookie() {
      try {
        const user_data_t = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/check_user`, {
          credentials: "include",
        })
        .then((res)=>res.json())
        if(user_data_t){
          dispatch(log_in(user_data_t))
          navigate("/user_interface")
        }
      } catch (error) {
        console.log(error);
      }
    }
    get_all_games()
    check_cookie()
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
