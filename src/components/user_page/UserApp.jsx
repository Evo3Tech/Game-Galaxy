import "../../css/user_page/user_page.css"
import { useDispatch, useSelector } from "react-redux"
import SideNav from "./SideNav.jsx"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ChatSection from './home_page/chat/ChatSection.jsx'
import Userbar from "./Userbar.jsx"
import { set_all_games } from "../../redux_store/games/gamesSlice.js"
import Notification_box from "./home_page/notifications/Notifications_box.jsx"


function User_App() {
    const navigate = useNavigate()
    const user_info = useSelector((state)=>state.user.info)
    if(user_info == null) navigate('/login')

    useEffect(() => {
        if (user_info == null) {
            navigate('/login');
        }
    }, [user_info]);
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