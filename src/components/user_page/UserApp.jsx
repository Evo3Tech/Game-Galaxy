import "../../css/user_page/user_page.css"
import { useDispatch, useSelector } from "react-redux"
import SideNav from "./SideNav"
import Header from "./Header"
import { Outlet } from "react-router-dom"


function User_App() {
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