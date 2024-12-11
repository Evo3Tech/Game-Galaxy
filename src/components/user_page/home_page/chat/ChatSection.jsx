import { show_messages } from "../../../../redux_store/user/userSlice"
import Friend from "./friend"
import Chat from "./Chat";
import "/src/css/user_page/chat.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

function ChatSection() {
    const [currentMessage, setCurrentMessage] = useState({})
    const [current_friend, set_current_friend] = useState('')

    const user_info = useSelector((state)=>state.user.info)
    if(!user_info) return
    const dispatch = useDispatch()
    const show_messages_v = useSelector((state)=>state.user.show_messages)
    if(!show_messages_v){
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
    function close_chat() {
        dispatch(show_messages())
    }
    async function send_message(e) {
        e.preventDefault()
        let new_message = {
            user_id: user_info.id,
            text: e.target[0].value, 
            message_box_id: currentMessage.id
        }
        
        const response = await send_request('http://localhost:1231/messages/send' , new_message)
        if(response.status == 201){
            // dispatch(rm_friend_action(friend.id))
            current_friend.click()
        }

    }
    return(
        <div className="chat_section">
            <span>Friends</span> 
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
                    currentMessage != {}
                    ? <Chat messages={currentMessage.messages} user_id={user_info.id} />
                    : ''
                }
            </div>
            <form action="" method="post" onSubmit={send_message}>
                <input type="text" className="send_message_inp" placeholder="send message.."/>
            </form>
            <span id="close_chat" onClick={close_chat}>X</span>
        </div>
    )
}

export default ChatSection