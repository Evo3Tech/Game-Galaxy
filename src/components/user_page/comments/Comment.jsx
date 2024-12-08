import { useDispatch, useSelector } from 'react-redux'
import './comments.css'
import { useState } from 'react'
import { add_to_liked, rm_from_liked } from '../../../redux_store/user/userSlice'


export default function Comment({comment}) {
    const dispatch = useDispatch()

    const user_info = useSelector((state)=>state.user.info)
    if(!user_info){
        return
    }
    const name = user_info.name
    const [already_liked, set_already_liked] = useState(
        ()=>user_info.liked.includes(comment.comment_id)
    )

    console.log(comment);
    
    async function add_like() {
        const response = await fetch('http://localhost:1231/add_like', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name: name,
                    comment_id: comment.comment_id
                }
            )
        })
        if(response.status == 201){
            dispatch(add_to_liked(comment.comment_id))  
            comment.likes += 1
            set_already_liked(true)
        }
        else if(response.status == 202){
            dispatch(rm_from_liked(comment.comment_id))
            comment.likes -= 1

            set_already_liked(false)
        }
        
    }
    
    return(
            <div className='comment'>
                <div className="comment_cont">
                    <div className="img">
                        <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png" alt="" />
                    </div>
                    <div className="comment_content">
                        <h5 className='username_comment'>{comment.writer}</h5>
                        <p>
                        {comment.text}
                        </p>
                    </div>
                </div>
                <button className={already_liked ? 'like_btn active' :'like_btn'} onClick={()=>{add_like()}}>
                    <svg width="auto" height="5vh" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.2699 16.265L20.9754 12.1852C21.1516 11.1662 20.368 10.2342 19.335 10.2342H14.1539C13.6404 10.2342 13.2494 9.77328 13.3325 9.26598L13.9952 5.22142C14.1028 4.56435 14.0721 3.892 13.9049 3.24752C13.7664 2.71364 13.3545 2.28495 12.8128 2.11093L12.6678 2.06435C12.3404 1.95918 11.9831 1.98365 11.6744 2.13239C11.3347 2.29611 11.0861 2.59473 10.994 2.94989L10.5183 4.78374C10.3669 5.36723 10.1465 5.93045 9.86218 6.46262C9.44683 7.24017 8.80465 7.86246 8.13711 8.43769L6.69838 9.67749C6.29272 10.0271 6.07968 10.5506 6.12584 11.0844L6.93801 20.4771C7.0125 21.3386 7.7328 22 8.59658 22H13.2452C16.7265 22 19.6975 19.5744 20.2699 16.265Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M2.96767 9.48508C3.36893 9.46777 3.71261 9.76963 3.74721 10.1698L4.71881 21.4063C4.78122 22.1281 4.21268 22.7502 3.48671 22.7502C2.80289 22.7502 2.25 22.1954 2.25 21.5129V10.2344C2.25 9.83275 2.5664 9.5024 2.96767 9.48508Z" fill="currentColor"></path> </g></svg>
                    <span>{comment.likes}</span>
                </button>
            </div>
    )
}