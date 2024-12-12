import { useDispatch, useSelector } from 'react-redux'
import './comments.css'
import { useState } from 'react'
import { add_friend_action, add_to_liked, rm_friend_action, rm_from_liked } from '../../../redux_store/user/userSlice'


export default function Comment({comment}) {
    const dispatch = useDispatch()
    // console.log(comment);
    
    const user_info = useSelector((state)=>state.user.info)
    if(!user_info){
        return
    }
    console.log('================');
    console.log(user_info);
    console.log('===============');
    
    const name = user_info.name
    const [already_liked, set_already_liked] = useState(
        ()=>user_info.liked.includes(comment.comment_id)
    )

    
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
    async function add_friend() {
        const response = await fetch('http://localhost:1231/friends/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    user_id: user_info.id,
                    target_friend_id: comment.user_id,
                    target_friend_name: comment.writer
                }
            )
        })
        if(response.status == 200){
            dispatch(add_friend_action({id: comment.user_id, name: comment.writer}))
        }
        else if(response.status == 201){
            dispatch(rm_friend_action({id: comment.user_id, name: comment.writer}))
        }
        else{
            alert('FAiled!')
        }
    }
    let add_friend_styles =
        user_info.friends.some(fr=>fr.id == comment.user_id) 
        || comment.user_id == user_info.id 
            ? {display: 'none'} 
            : {color: 'aliceblue', backgroundColor: '#2c2c3e'}

    return(
            <div className='comment'>
                <div className="comment_cont">
                    <div className="img">
                        <img src={comment.user_img} alt="" />
                    </div>
                    <div className="comment_content">
                        <h5 className='username_comment'>
                            {comment.writer}
                            <span style={add_friend_styles} className="add_friend_btn" onClick={add_friend}>
                            <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 45.902 45.902" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M43.162,26.681c-1.564-1.578-3.631-2.539-5.825-2.742c1.894-1.704,3.089-4.164,3.089-6.912 c0-5.141-4.166-9.307-9.308-9.307c-4.911,0-8.932,3.804-9.281,8.625c4.369,1.89,7.435,6.244,7.435,11.299 c0,1.846-0.42,3.65-1.201,5.287c1.125,0.588,2.162,1.348,3.066,2.26c2.318,2.334,3.635,5.561,3.61,8.851l-0.002,0.067 l-0.002,0.057l-0.082,1.557h11.149l0.092-12.33C45.921,30.878,44.936,28.466,43.162,26.681z"></path> <path d="M23.184,34.558c1.893-1.703,3.092-4.164,3.092-6.912c0-5.142-4.168-9.309-9.309-9.309c-5.142,0-9.309,4.167-9.309,9.309 c0,2.743,1.194,5.202,3.084,6.906c-4.84,0.375-8.663,4.383-8.698,9.318l-0.092,1.853h14.153h15.553l0.092-1.714 c0.018-2.514-0.968-4.926-2.741-6.711C27.443,35.719,25.377,34.761,23.184,34.558z"></path> <path d="M6.004,11.374v3.458c0,1.432,1.164,2.595,2.597,2.595c1.435,0,2.597-1.163,2.597-2.595v-3.458h3.454 c1.433,0,2.596-1.164,2.596-2.597c0-1.432-1.163-2.596-2.596-2.596h-3.454V2.774c0-1.433-1.162-2.595-2.597-2.595 c-1.433,0-2.597,1.162-2.597,2.595V6.18H2.596C1.161,6.18,0,7.344,0,8.776c0,1.433,1.161,2.597,2.596,2.597H6.004z"></path> </g> </g> </g></svg>
                            </span>
                        </h5>
                        
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