import Friend from "./friend"
import "/src/css/user_page/chat.css"
import { useDispatch, useSelector } from "react-redux"


function ChatSection() {
    // const user_info = useSelector((state)=>state.user.info)
    const dispatch = useDispatch()
    const show_messages_v = useSelector((state)=>state.user.show_messages)
    if(!show_messages_v){
        return
    }
    let friends = ['s', 'x', 'a', 'x', 'x', 'x', 'x']
    return(
        <div className="chat_section">
            <span>Friends</span> 
            <div className="friends">
                {
                    friends.map((fr)=><Friend/>)
                }
            </div>
            <span>Chat</span>
            <div className="chat">
                chat
            </div>
            <span id="close_chat">X</span>
        </div>
    )
}

export default ChatSection