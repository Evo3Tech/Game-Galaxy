import { useEffect, useState } from "react";
import Game from "./Game";
import { useSelector } from "react-redux";

export default function Games(){
    const [data,setdata]=useState([]);
    const is_searching = useSelector((state)=>state.user.searching)
    const ShowFav = useSelector((state)=>state.user.showFavotites)
    console.log(ShowFav);
    
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
    return(
        <div className="games" style={styles}>
            {!ShowFav ? (data.map((game, k)=>{
                if(game.name.toLowerCase().includes(dd.search))
              return  <Game game={game} key={k}/>
            })) :((data.map((game, k)=>{
                if(game.name.toLowerCase().includes(dd.search) && dd.info.favorites.includes(game.id))
              return  <Game game={game} key={k}/>
            })))
            // : (
            //     data.map((game, k)=>{
            //         if(dd.info.favorites.includes(game.id))
            //       return  <Game game={game} key={k}/>
            //     })
            // )
            }
        </div>
    )
}