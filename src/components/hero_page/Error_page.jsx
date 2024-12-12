import { useRouteError } from "react-router-dom"

export default function Error_page() {
    const error_msg = useRouteError()
    return(
        <>
            <div className="background_img">d</div>
            <div className="errorpage_body">
                <div className="error_box">
                    <h1>Error</h1>
                    <p>
                        {error_msg.message}
                    </p>
                </div>
            </div>
        
        </>
    )
}