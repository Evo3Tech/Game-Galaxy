import { useDispatch, useSelector } from "react-redux"
import { log_out, show_notification } from "../../redux_store/user/userSlice.js"
import { useLocation } from "react-router-dom"

export default function Userbar() {
    const current_page = useLocation().pathname.split('/')[2]
    const user = useSelector((state)=>state.user.info)
    const dispatch = useDispatch()
    if(user == null) return
    async function log_out_f() {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/logout`, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: "include"
            })
            if(response.ok){
                dispatch(log_out())
                navigate("/")
            }
            else{
                throw new Error(await response.text())
            }
        } catch (error) {
            console.error("error in log out: ", error);
        }
    }
    return(
        <div className="user_bar_cont">
        <span onClick={()=>{dispatch(show_notification())}} className={
            current_page == 'profile' || current_page == 'settings' 
            ? "userbar move_to_side notification_btn" 
            : "userbar notification_btn"
            }>
            <svg fill="currentColor" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" xml:space="preserve" stroke="aliceblue"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003 S232.835,0,149.996,0z M149.999,232.951c-10.766,0-19.499-8.725-19.499-19.499h38.995 C169.497,224.226,160.765,232.951,149.999,232.951z M215.889,193.9h-0.005v-0.001c0,7.21-5.843,7.685-13.048,7.685H97.16 c-7.208,0-13.046-0.475-13.046-7.685v-1.242c0-5.185,3.045-9.625,7.42-11.731l4.142-35.753c0-26.174,18.51-48.02,43.152-53.174 v-13.88c0-6.17,5.003-11.173,11.176-11.173c6.17,0,11.173,5.003,11.173,11.173V92c24.642,5.153,43.152,26.997,43.152,53.174 l4.142,35.758c4.375,2.109,7.418,6.541,7.418,11.726V193.9z"></path> </g> </g> </g></svg>
            </span>
        <span className={
            current_page == 'profile' || current_page == 'settings' 
            ? "userbar move_to_side logout" 
            : "userbar logout"
            }>
            <svg onClick={log_out_f} width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z" fill="currentColor"></path> <path d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z" fill="currentColor"></path> </g></svg>
        </span>
        </div>
    )
}