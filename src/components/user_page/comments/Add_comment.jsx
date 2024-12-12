import { useRef } from 'react'
import './comments.css'
import { useSelector } from 'react-redux'
export default function Add_comment({game_id, set_comment_added}) {
    const commentRef = useRef()
    const user_info = useSelector((state)=>state.user.info)
    if(!user_info){
        return
    }
    const name = user_info.name
    function add_comment() {
        
        let new_comment = commentRef.current.innerText
        let request = fetch('http://localhost:1231/add_comment', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: name,
                user_id: user_info.id,
                game_id: game_id,
                comment_txt: new_comment,
                user_img: user_info.avatar
            })
        })
        if (request.ok){
            alert('added')
        }
        set_comment_added(true)
        
    }
    return(
        <div className="add_comment">
            <div className="img">
                <img src="https://r2.erweima.ai/imgcompressed/img/compressed_3fb0c1cbf881088a500800c43b6bd412.webp" alt="" />
            </div>
            <div className="text_comment">
                <div className='comment_inp' contentEditable={true} ref={commentRef} >
                    add comment...
                </div>
                <button onClick={add_comment}>Comment</button>
            </div>
        </div>
    )
}