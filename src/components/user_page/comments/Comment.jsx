import './comments.css'
export default function Comment() {
    
    return(
            <div className='comment'>
                <div className="comment_cont">
                    <div className="img">
                        <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="" />
                    </div>
                    <div className="comment_content">
                        <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, enim! Perferendis
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, enim! Perferendis
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, enim! Perferendis
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, enim! Perferendis
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, enim! Perferendis
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, enim! Perferendis
                        </p>
                    </div>
                </div>
                <button className='like_btn'>like</button>
            </div>
    )
}