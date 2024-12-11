import { useEffect, useRef, useState } from "react";
import Game from "./Game";
import { useSelector } from "react-redux";

export default function Games(){
    const [data,setdata]=useState([]);
    const is_searching = useSelector((state)=>state.user.searching)
    const ShowFav = useSelector((state)=>state.user.showFavotites)
    const gamesRef = useRef()
    
    useEffect(()=>{
        fetch('http://localhost:1231/all_Games')
        .then((data)=>data.json())
        .then((res)=>setdata(res))
    },[])
    const dd = useSelector((state)=>state.user)
    console.log("dd:", dd);
    let styles = {
        transform: 'translateY(20%) scaleY(.8)'
    }
    if(!is_searching) styles = {} 
    let b = 0
    return(
        <>
            <div className="games" style={styles}>
                <button className="show_games">
                    <svg width="64px" height="64px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 13.8599L10.87 10.8C11.0125 10.6416 11.1868 10.5149 11.3815 10.4282C11.5761 10.3415 11.7869 10.2966 12 10.2966C12.2131 10.2966 12.4239 10.3415 12.6185 10.4282C12.8132 10.5149 12.9875 10.6416 13.13 10.8L16 13.8599" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 7.41992L3 17.4199C3 19.6291 4.79086 21.4199 7 21.4199H17C19.2091 21.4199 21 19.6291 21 17.4199V7.41992C21 5.21078 19.2091 3.41992 17 3.41992H7C4.79086 3.41992 3 5.21078 3 7.41992Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>            
                </button>
                {!ShowFav 
                    ? (data.map((game, k)=>{
                        b += 1
                        if(game.name.toLowerCase().includes(dd.search)){
                            return  <Game game={game} key={k}/>
                        }
                    })) 
                    :((data.map((game, k)=>{
                        if(game.name.toLowerCase().includes(dd.search) && dd.info.favorites.includes(game.id)){
                            b += 1
                            return  <Game game={game} key={k}/>
                        }
                    })))
                }
                {
                    b == 0 
                    ? <span className="empty_favorites">Your favorites list is empty</span>
                    : ''
                }
            </div>
        </>    
    )
}