import { Outlet, useNavigate } from "react-router-dom";
import heroImg from "../../imgs/hero.png"
import "../../index.css"
export function Hero_page(){
    const navigate = useNavigate()
    return(
        <>
            <div className="left hero">
                <img src={heroImg} alt="" />
            </div>
            <div className="right hero">
                <h1>
                    Ready to Game?
                </h1>
                <p>
                Connect with skilled players, share strategies, and take your gaming to the next level.
                </p>
                <button onClick={()=>{navigate('/signup')}}>Join Us</button>
            </div>
        </>
    )
}