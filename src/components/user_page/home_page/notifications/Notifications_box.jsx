import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show_notification } from "../../../../redux_store/user/userSlice";

export default function Notification_box(){
    const show_notifications = useSelector((state)=>state.user.show_notification)
    const dispach = useDispatch()
    const [list_request, set_list_request] = useState([
        {
            id: "asd",
            name: "asd",
            img: "/public/avatars/1.png"
        },
        {
            id: "xa",
            name: "v",
            img: "/public/avatars/2.png"
        }
    ])
    if(!show_notifications) return
    const current_fr = list_request[0]
    function accept_fr(id) {
        set_list_request(list_request.splice(1))
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
                <h1>{current_fr.name}</h1>
                <span>
                    <button onClick={()=>{accept_fr(current_fr.id)}}>accept</button>
                    <button>refuse</button>
                </span>
            </div>
        }
        <span id="close_fr_box" onClick={()=>{dispach(show_notification())}} >X</span>
        </div>
    )
}