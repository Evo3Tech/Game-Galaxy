import "../../css/user_page/user_page.css"
import home_svg from "../../imgs/logos/home.svg"

function SideNav() {
    return(
        <div className="sideNav">
            <nav>
                <button>
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