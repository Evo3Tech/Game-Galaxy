import Comment from './Comment'
import './comments.css'
export default function Comment_List() {
    
    return(
        <div className="comments_list">
            <h1>Comments: </h1>
            <div>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </div>
        </div>
    )
}