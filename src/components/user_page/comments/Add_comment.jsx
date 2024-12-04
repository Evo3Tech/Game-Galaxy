import './comments.css'
export default function Add_comment() {
    
    return(
        <div className="add_comment">
            <div className="img">
                <img src="https://r2.erweima.ai/imgcompressed/img/compressed_3fb0c1cbf881088a500800c43b6bd412.webp" alt="" />
            </div>
            <div className="text_comment">
                <div className='comment_inp' contentEditable={true}>
                    ssad
                </div>
                <button>Comment</button>
            </div>
        </div>
    )
}