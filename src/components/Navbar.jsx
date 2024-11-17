import { useNavigate } from "react-router-dom"

export function Navbar(){
    const navigate = useNavigate()
    return(
        <nav>
            <h1>Game Galaxy</h1>
            <ul className="navbar">
                <li onClick={()=>{navigate('/')}}>home</li>
                <li onClick={()=>{navigate('/login')}}>Log In</li>
                <li onClick={()=>{navigate('/signup')}}>Sign Up</li>
            </ul>
        </nav>
    )
}