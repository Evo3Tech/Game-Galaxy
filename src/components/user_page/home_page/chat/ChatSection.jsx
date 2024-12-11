import { show_messages } from "../../../../redux_store/user/userSlice"
import Friend from "./friend"
import "/src/css/user_page/chat.css"
import { useDispatch, useSelector } from "react-redux"


function ChatSection() {
    const user_info = useSelector((state)=>state.user.info)
    if(!user_info) return
    const dispatch = useDispatch()
    const show_messages_v = useSelector((state)=>state.user.show_messages)
    if(!show_messages_v){
        return
    }
    function close_chat() {
        dispatch(show_messages())
    }
    return(
        <div className="chat_section">
            <span>Friends</span> 
            <div className="friends">
                {
                    user_info.friends.length == 0 
                    ? <span className="friends_empty">Friends list is empty</span>
                    : user_info.friends.map((fr)=><Friend friend={fr}/>)
                }
            </div>
            <span>Chat</span>
            <div className="chat">
                chat
            </div>
            <span id="close_chat" onClick={close_chat}>X</span>
        </div>
    )
}

export default ChatSection