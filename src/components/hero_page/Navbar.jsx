import { useLocation, useNavigate, useParams } from "react-router-dom"

export function Navbar(){
    const navigate = useNavigate()
    const current_page = useLocation().pathname
    
    return(
        <nav>
            <h1>Game Galaxy</h1>
            <ul className="navbar">
                <li className={current_page == '/' ? "active": ""} onClick={()=>{navigate('/')}}>home</li>
                <li className={current_page == '/login' ? "active": ""} onClick={()=>{navigate('/login')}}>Log In</li>
                <li className={current_page == '/signup' ? "active": ""} onClick={()=>{navigate('/signup')}}>Sign Up</li>
            </ul>
        </nav>
    )
}