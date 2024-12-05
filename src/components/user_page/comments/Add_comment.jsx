import { useRef } from 'react'
import './comments.css'
import { useSelector } from 'react-redux'
export default function Add_comment({game_id, set_comment_added}) {
    const commentRef = useRef()
    const username = useSelector((state)=>state.user.info.username)
    function add_comment() {
        let new_comment = commentRef.current.innerText
        let request = fetch('http://localhost:1231/add_comment', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                comment_txt: new_comment,
                game_id: game_id,
                username: username
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
                <div className='comment_inp' contentEditable={true} ref={commentRef}>
                    ssad
                </div>
                <button onClick={add_comment}>Comment</button>
            </div>
        </div>
    )
}