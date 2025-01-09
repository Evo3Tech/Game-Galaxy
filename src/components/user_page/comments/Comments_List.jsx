import Comment from './Comment.jsx'
import './comments.css'
export default function Comment_List({comments}) {
    
    return(
        <div className="comments_list">
            <h1>Comments: </h1>
            <div>

                {
                    comments.length == 0 
                    ? <span className='no_comments'>no comments</span> 
                    : comments.map((comment, k)=>{
                        return(
                            <Comment comment={comment} key={k}/>
                        )
                    })
                }
            </div>
        </div>
    )
}