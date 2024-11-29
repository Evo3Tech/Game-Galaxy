import "../../../css/user_page/home_page.css"
import ChatSection from "./ChatSection"
import OverView from "./OverView"
// import { useSelector } from "react-redux"


function HomePage() {
    // const user_info = useSelector((state)=>state.user.info)
    return(
        <div className="home_page">
            <OverView/>
            {/* <ChatSection/> */}
        </div>
    )
}

export default HomePage