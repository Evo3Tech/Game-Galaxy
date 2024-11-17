import { Outlet } from "react-router-dom";
import heroImg from "../imgs/hero.png"
export function Hero_page(){
    return(
        <>
            <div className="left">
                <img src={heroImg} alt="" />
            </div>
            <div className="right">
                <h1>
                    Ready to Game?
                </h1>
                <p>
                Connect with skilled players, share strategies, and take your gaming to the next level.
                </p>
                <button>Join Us</button>
            </div>
        </>
    )
}