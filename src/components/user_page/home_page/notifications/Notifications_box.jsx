import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_friend_action, rm_friend_action, show_notification } from "../../../../redux_store/user/userSlice";

export default function Notification_box(){
    const show_notifications = useSelector((state)=>state.user.show_notification)
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user.info)
    const [list_request, set_list_request] = useState([])
    useEffect(()=>{
        async function get_requests() {
            try {
                await fetch(`${import.meta.env.VITE_SERVER_URL}/user/friends`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(
                        {
                            user_id: user.id
                        }
                    )
                })
                .then((res)=>res.json())
                .then((data)=>{set_list_request(data)})
            } catch (error) {
                console.log(error);
            }
        }
        get_requests()
    }, [show_notifications])
    if(!show_notifications) return
    const current_fr = list_request[0]
    async function accept_fr() {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/friends/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(
                {
                    user_id: user.id,
                    target_friend_name: current_fr.user_s_name,
                    target_u_id: current_fr.user_s_id,
                }
            )
        })
        if(response.status == 200){
            dispatch(add_friend_action({id: current_fr.user_s_id, name: current_fr.user_s_name}))
            update_requests()
        }
        else if(response.status == 201){
            dispatch(rm_friend_action({id: current_fr.user_s_id, name: current_fr.user_s_name}))
            update_requests()
        }
        else{
            alert('FAiled!')
            console.log(response);
            
        }
    }
    function update_requests() {
        set_list_request(list_request.splice(1))
        dispatch(show_notification())
    }
    return(
        <div class="notifications_box">
            <h1>Friend requests: </h1>
            {!list_request.length
            ? <span className="empty_fr">
                no friend requests
                </span>
            :<div className="friend_request">
                <img src={current_fr.img} alt="" />
                <h1>{current_fr.user_s_name}</h1>
                <span>
                    <button onClick={()=>{accept_fr(current_fr.id)}}>accept</button>
                    <button>refuse</button>
                </span>
            </div>
        }
        <span id="close_fr_box" onClick={()=>{dispatch(show_notification())}} >X</span>
        </div>
    )
}