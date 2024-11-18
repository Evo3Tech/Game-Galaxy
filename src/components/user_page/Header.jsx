import "../../css/user_page/user_page.css"
import { useSelector } from "react-redux"
import SideNav from "./SideNav"
import { useNavigate } from "react-router-dom"

function Header() {
      const user_info = useSelector((state)=>state.user.info)
      const navigate = useNavigate()
    return(
        <header>
            <input type="search" id="searchBar"/>
            <div className="options">
                <button onClick={()=>{navigate('profile')}}>Profile</button>
                <button onClick={()=>{navigate('settings')}}>Settings</button>
                <button>Logout</button>
            </div>
        </header>
    )
}

export default Header