import "../../../css/user_page/home_page.css"
import OverView from "./OverView"
// import { useSelector } from "react-redux"


function HomePage() {
    // const user_info = useSelector((state)=>state.user.info)
    return(
        <div className="home_page">
            <OverView/>
        </div>
    )
}

export default HomePage