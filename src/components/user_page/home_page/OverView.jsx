import "../../../css/user_page/home_page.css"
import Games from "./OverView_components/Games"
import Posters from "./OverView_components/Posters"
// import { useSelector } from "react-redux"


function OverView() {
    // const user_info = useSelector((state)=>state.user.info)
    return(
        <div className="over_view">
            <Posters/>
            <Games/>
        </div>
    )
}

export default OverView