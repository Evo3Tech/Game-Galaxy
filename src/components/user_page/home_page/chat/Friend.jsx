import { useDispatch, useSelector } from "react-redux"
import { rm_friend_action } from "../../../../redux_store/user/userSlice.js"

export default function Friend({friend, set_chat, set_current_friend}) {
    const dispatch = useDispatch()
    const user_info = useSelector((state)=>state.user.info)
    if(!user_info){
        return
    }
    async function send_request(url, body) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                body
            )
        })
    }
    async function del_friend() {
        const response = await send_request(`https://gamegalaxy-production.up.railway.app/user/friends/add` , {
            user_id: user_info.id,
            target_friend_id: friend.id,
            target_friend_name: friend.name
        }
        )
        if(response.status == 201){
            dispatch(rm_friend_action(friend.id))
            set_chat('')
            set_current_friend('')
        }
        else{
            alert('FAiled!')
        }
    }
    async function get_message_box(e) {
        if(e.target.localName == 'path' || e.target.localName == 'svg') return
        const response = await send_request(`https://gamegalaxy-production.up.railway.app/user/messages`, {
            user_1: user_info.id,
            user_2: friend.id
        })
        if(response.ok){
            set_chat(await response.json())
            set_current_friend(e.target)
        }
    }
    return(
        <div className="friend" onClick={get_message_box}>
            <div>
                <img src="https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" alt="g" />
                <h4>{friend.name}</h4>
            </div>
            {/* <button>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88836 21.6244 10.4003 22 12 22Z" fill="currentColor"></path> <path d="M7.825 12.85C7.36937 12.85 7 13.2194 7 13.675C7 14.1306 7.36937 14.5 7.825 14.5H13.875C14.3306 14.5 14.7 14.1306 14.7 13.675C14.7 13.2194 14.3306 12.85 13.875 12.85H7.825Z" fill="currentColor"></path> <path d="M7.825 9C7.36937 9 7 9.36937 7 9.825C7 10.2806 7.36937 10.65 7.825 10.65H16.625C17.0806 10.65 17.45 10.2806 17.45 9.825C17.45 9.36937 17.0806 9 16.625 9H7.825Z" fill="currentColor"></path> </g></svg>
            </button> */}
            <button className="del_friend" onClick={del_friend}>
                <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 45.959 45.959" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M39.229,6.731c-8.975-8.974-23.523-8.974-32.498,0s-8.974,23.523,0,32.498c8.974,8.974,23.523,8.974,32.497-0.001 C48.202,30.254,48.203,15.704,39.229,6.731z M32.363,26.711c1.561,1.561,1.561,4.092,0,5.651c-1.562,1.561-4.092,1.561-5.652,0 l-3.748-3.749l-3.74,3.74c-1.561,1.562-4.074,1.578-5.635,0.019c-1.56-1.561-1.542-4.073,0.019-5.635l3.74-3.74L13.6,19.251 c-1.561-1.561-1.567-4.098-0.006-5.658s4.096-1.556,5.656,0.005l3.749,3.749l3.74-3.74c1.561-1.561,4.073-1.578,5.634-0.019 c1.561,1.561,1.543,4.074-0.019,5.635l-3.739,3.74L32.363,26.711z"></path> </g> </g></svg>
            </button>
        </div>
    )
}