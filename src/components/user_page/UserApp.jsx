import "../../css/user_page/user_page.css"
import { useSelector } from "react-redux"
import SideNav from "./SideNav"
import Header from "./Header"
import { Outlet } from "react-router-dom"


function User_App() {
    const user_info = useSelector((state)=>state.user.info)
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