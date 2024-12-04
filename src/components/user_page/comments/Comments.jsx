import Add_comment from './Add_comment'
import './comments.css'
import Comment_List from './Comments_List'
export default function Comments() {
    
    return(
        <div className="comments">
            <Comment_List/>
            <Add_comment/>
        </div>
    )
}