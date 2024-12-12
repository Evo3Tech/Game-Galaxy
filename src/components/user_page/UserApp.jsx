import "../../css/user_page/user_page.css"
import { useDispatch, useSelector } from "react-redux"
import SideNav from "./SideNav"
import Header from "./Header"
import { Outlet, useNavigate } from "react-router-dom"
import App from "../../App"
import { useEffect } from "react"
import ChatSection from './home_page/chat/ChatSection'


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
            <div className="user_container">
                <Outlet/>
            </div>
        </div>
    )
}

export default User_App