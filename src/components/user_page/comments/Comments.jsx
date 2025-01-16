import { useEffect, useState } from 'react'
import Add_comment from './Add_comment.jsx'
import './comments.css'
import Comment_List from './Comments_List.jsx'
export default function Comments({game_id}) {
    const [all_comments, set_all_comments] = useState([])
    const [comment_added, set_comment_added] = useState(false)
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_SERVER_URL}/all_comments`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                game_id: game_id
            })
        })
        .then((res)=>res.json())
        .then((comments)=>{            
            set_all_comments(comments)
        })
        if(comment_added){
            set_comment_added(false)
        }
    }, [comment_added])
    return(
        <div className="comments">
            <Comment_List comments={all_comments}/>
            <Add_comment game_id={game_id} set_comment_added={set_comment_added}/>
        </div>
    )
}