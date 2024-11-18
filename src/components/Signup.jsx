import { Outlet } from "react-router-dom";
import heroImg from "../imgs/astronaut.png"

import "../signup.css"
import { useRef } from "react";

export function Signup(){
    const usernameRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    function handleForm(e) {
        e.preventDefault()
        let new_user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: pwdRef.current.value
        }
        fetch("http://localhost:1231/sign_up", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(new_user)
        })
    }
    return(
        <>
        <div className="left signup">
            <img src={heroImg} alt="" />

        </div>
        <div className="right">
            <h1>Sign Up</h1>
            <form onSubmit={handleForm}>
                <input type="text" placeholder="username" ref={usernameRef}/>
                <input type="email" placeholder="email" ref={emailRef}/>
                <input type="password" placeholder="password" ref={pwdRef}/>
                <input type="password" placeholder="repeate password"/>
                <button>Sign up</button>
            </form>
        </div>
        </>
    )
}