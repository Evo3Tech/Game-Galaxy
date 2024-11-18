import { useRef } from "react"
import heroImg from "../imgs/hero.png"

export function Login(){
    const usernameRef = useRef()
    const pwdRef = useRef()
    function handleForm(e) {
        e.preventDefault()
    }
    return(
        <>
        <div className="left login">
            <img src={heroImg} alt="" />

        </div>
        <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleForm}>
                <input type="text" placeholder="username" name="username" ref={usernameRef}/>
                <input type="password" placeholder="password" name="password" ref={pwdRef}/>
                <button>Login</button>
            </form>
        </div>
        </>
    )
}