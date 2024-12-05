import Comment from './Comment'
import './comments.css'
export default function Comment_List({comments}) {
    console.log(comments);
    
    return(
        <div className="comments_list">
            <h1>Comments: </h1>
            <div>

                {
                    comments.length == 0 
                    ? <span className='no_comments'>no comments</span> 
                    : comments.map((comment)=>{
                        return(
                            <Comment text={comment.text}/>
                        )
                    })
                }
            </div>
        </div>
    )
}