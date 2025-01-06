import { Outlet, useNavigate } from "react-router-dom";
import heroImg from "../../imgs/astro3.png";
import "../../animations_css/heropage_animations.css";
import "../../signup.css";
import { useRef, useState } from "react";
import Notification from "./Notification.jsx";

export function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();
    const repeatPwdRef = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();
 
    async function handleForm(e) {
        e.preventDefault();
        let new_user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: pwdRef.current.value,
            repeatPassword: repeatPwdRef.current.value,
        };

        if (!new_user.username || !new_user.email || !new_user.password || !new_user.repeatPassword) {
            setError("All fields are required.");
            return;
        }
        
        if (new_user.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (new_user.password !== new_user.repeatPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:1231/user/sign_up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(new_user),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Signup failed. Please try again.");
                return;
            }

            navigate("/login");
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    }

    return (
        <>
            <div className="left signup">
                <img src={heroImg} alt="" />
            </div>
            <div className="right signup">
                <h1>Sign Up</h1>
                {error && 
                <Notification message={error}/>}
                <form onSubmit={handleForm}>
                    <input type="text" placeholder="username" ref={usernameRef} />
                    <input type="email" placeholder="email" ref={emailRef} />
                    <input type="password" placeholder="password" ref={pwdRef} />
                    <input type="password" placeholder="repeat password" ref={repeatPwdRef} /> 
                    <button>Sign up</button>
                </form>
            </div>
        </>
    );
}
