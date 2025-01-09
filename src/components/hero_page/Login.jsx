import { useRef, useState } from "react"
import heroImg from "../../imgs/astro.png"
import "../../animations_css/heropage_animations.css"
import { useDispatch, useSelector } from "react-redux"


import { log_in } from "../../redux_store/user/userSlice"
import { useNavigate } from "react-router-dom"
import Notification from "./Notification"

export function Login(){
    const dispatch = useDispatch()
    const user_info = useSelector((state)=>state.user.info)
    const navigate = useNavigate()
    
    const usernameRef = useRef()
    const pwdRef = useRef()
    const [wrongpwd, set_wrongpwd] = useState(false)
    // const [current_user, setCurrent_user] = useState(null)
    async function handleForm(e) {
        e.preventDefault()
        let new_user = {
            username: usernameRef.current.value,
            password: pwdRef.current.value
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(new_user)
            })
            if(response.ok){
                // setCurrent_user()
                dispatch(log_in(await response.json()))
                navigate("/user_interface")
            }
            else{
                set_wrongpwd(true)
                set_wrongpwd(await response.text())
                throw new Error(await response.text())
            }

        } catch (error) {
            console.log(error);
        }
    }
    // console.log("current_user: ", current_user);
    
    return(
        <>
        <div className="left login">
            <img src={heroImg} alt="" />
        </div>
        <div className="right login">
        {
            wrongpwd
            ? <Notification title={'Wrong information'} message={wrongpwd}/>
            : ''
        }
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