import { Outlet } from "react-router-dom";
import heroImg from "../imgs/astronaut.png"

import "../signup.css"

export function Signup(){
    return(
        <>
        <div className="left signup">
            <img src={heroImg} alt="" />

        </div>
        <div className="right">
            <h1>Sign Up</h1>
            <form action="" method="post">
                <input type="text" placeholder="username"/>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <input type="password" placeholder="repeate password"/>
                <button>Sign up</button>
            </form>
        </div>
        </>
    )
}