import { useRef, useState } from "react"
import heroImg from "../../imgs/hero.png"

export function Login(){
    const usernameRef = useRef()
    const pwdRef = useRef()

    const [current_user, setCurrent_user] = useState(null)
    async function handleForm(e) {
        e.preventDefault()
        let new_user = {
            username: usernameRef.current.value,
            password: pwdRef.current.value
        }
        try {
            const response = await fetch("http://localhost:1231/login", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(new_user)
            })
            if(response.ok){
                setCurrent_user(await response.json())
            }
            else{
                throw new Error(await response.text())
            }

        } catch (error) {
            console.log(error);
        }
    }
    console.log("current_user: ", current_user);
    
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