import "../../css/user_page/user_page.css"
import { useDispatch, useSelector } from "react-redux"
import SideNav from "./SideNav"
import Header from "./Header"
import { Outlet, useNavigate } from "react-router-dom"
import App from "../../App"
import { useEffect } from "react"


function User_App() {
    const user_info = useSelector((state)=>state.user.info)
    const navigate = useNavigate()

    useEffect(() => {
        if (user_info == null) {
            navigate('/login');
        }
    }, [user_info]);

    return(
        <div className="user_interface">
            <SideNav />
            <div className="user_container">
                {/* <Header /> */}
                <Outlet/>
            </div>
        </div>
    )
}

export default User_App