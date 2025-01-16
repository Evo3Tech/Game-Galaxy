import { show_messages } from "../../../../redux_store/user/userSlice"
import Friend from "./Friend.jsx"
import Chat from "./Chat.jsx";
import "/src/css/user_page/chat.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";

function ChatSection() {
    const [currentMessage, setCurrentMessage] = useState('')
    const [current_friend, set_current_friend] = useState('')

    const user_info = useSelector((state)=>state.user.info)
    useEffect(()=>{
        if(!user_info.friends.some(fr=>fr.name == current_friend.outerText)){
            setCurrentMessage("")
            set_current_friend("")
        }
        
    }, [user_info])
    if(!user_info) return
    const dispatch = useDispatch()
    const show_messages_v = useSelector((state)=>state.user.show_messages)
    if(!show_messages_v){
        if(current_friend != '') {
            set_current_friend('')
        }
        return
    }
    async function send_request(url, body) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(
                body
            )
        })
    }
    function close_chat() {
        set_current_friend('')
        setCurrentMessage('')
        dispatch(show_messages())
    }
    async function send_message(e) {
        e.preventDefault()
        let new_message = {
            user_id: user_info.id,
            text: e.target[0].value, 
            message_box_id: currentMessage.id
        }
        
        const response = await send_request(`${import.meta.env.VITE_SERVER_URL}/user/messages/send` , new_message)
        if(response.status == 201){
            // dispatch(rm_friend_action(friend.id))
            current_friend.click()
        }

    }
    return(
        <div className="chat_section">
            <span>Followers</span> 
            <div className="friends">
                {
                    user_info.friends.length == 0 
                    ? <span className="friends_empty">Friends list is empty</span>
                    : user_info.friends.map((fr)=><Friend friend={fr} set_chat={setCurrentMessage} set_current_friend={set_current_friend} />)
                }
            </div>
            <span>Chat</span>
            <div className="chat">
                {
                    current_friend
                    ? <Chat messages={currentMessage.messages} user_id={user_info.id} />
                    : <span className="no_messages">Select a friend</span>
                }
            </div>
            <form action="" method="post" onSubmit={send_message}>
                {
                    current_friend && 
                <input type="text" className="send_message_inp" placeholder="send message.."/>
                }
            </form>
            <span id="close_chat" onClick={close_chat}>X</span>
        </div>
    )
}

export default ChatSection