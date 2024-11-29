import { useEffect, useState } from "react";
import Game from "./Game";

export default function Games(){
    const [data,setdata]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:1231/all_Games')
        .then((data)=>data.json())
        .then((res)=>setdata(res))
    },[])
    return(
        <div className="games">
            {data.map((d)=>{
              return  <Game game={d}/>
            })}
        </div>
    )
}