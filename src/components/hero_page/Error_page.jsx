import { useNavigate, useRouteError } from "react-router-dom"

export default function Error_page() {
    const navigate = useNavigate()
    const error_msg = useRouteError()

    setTimeout(()=>{
        navigate(-1)
    }, 1500)
    return(
        <>
            <div className="background_img">d</div>
            <div className="errorpage_body">
                <div className="error_box">
                    <h1>Error</h1>
                    <p>
                        {
                            error_msg.message || 'path not found'
                        }
                    </p>
                </div>
            </div>
        
        </>
    )
}