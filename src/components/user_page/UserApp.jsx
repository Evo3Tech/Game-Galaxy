import "../../css/user_page/user_page.css"
import { useDispatch, useSelector } from "react-redux"
import SideNav from "./SideNav.jsx"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ChatSection from './home_page/chat/ChatSection.jsx'
import Userbar from "./Userbar.jsx"
import { set_all_games } from "../../redux_store/games/gamesSlice.js"
import Notification_box from "./home_page/notifications/Notifications_box.jsx"
import { log_in } from "../../redux_store/user/userSlice.js"


function User_App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const user_info = useSelector((state)=>state.user.info)
    if(user_info == null && location.pathname != "/login") navigate('/login')
    useEffect(() => {
        if (user_info == null && location.pathname != "/login") {
            navigate('/login');
        }
    }, [user_info]);
    const intervalTime = 5000
    useEffect(() => {
        const interval = setInterval(async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/user_info`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({id: user_info.id})
            });
      
            if (response.ok) {
              const data = await response.json();
              dispatch(log_in(data));
            } else {
              console.error("Failed to fetch user data:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }, intervalTime);
      
        return () => clearInterval(interval);
    }, [intervalTime]);
      
    return(
        <div className="user_interface">
            <SideNav />
            <ChatSection/>
            <Notification_box />
            <Userbar/>
            <div className="user_container">
                <Outlet/>
            </div>
        </div>
    )
}

export default User_App