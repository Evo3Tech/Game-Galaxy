import { useNavigate } from "react-router-dom"
import "../../css/user_page/user_page.css"
import home_svg from "../../imgs/logos/home.svg"

function SideNav() {
    const navigate = useNavigate()
    return(
        <div className="sideNav">
            <nav>
                <button onClick={()=>{navigate("/user_interface")}}>
                    <img src={home_svg} alt="" />
                </button>
                <button>
                    <img src={home_svg} alt="" />
                </button>
                <button>
                    <img src={home_svg} alt="" />
                </button>
                <button>
                    <img src={home_svg} alt="" />
                </button>
            </nav>
        </div>
    )
}

export default SideNav