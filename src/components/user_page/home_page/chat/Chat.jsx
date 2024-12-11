import { useState } from "react"

export default function Chat({messages, user_id}) {
    if(!messages) return
    else if(messages.length == 0){
        return(
            <span className="no_messages">
                no messages
            </span>
        )
    }
    return (
        <>
        {
            messages.map((m, k)=>{
            return(
                <div key={m.text} className={m.user_id == user_id ? 'sent messages_in' : 'recieved messages_in'}>
                    {m.text}
                </div>
            )
           })
        }
        </>
    )
}