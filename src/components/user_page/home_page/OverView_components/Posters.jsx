import { useSelector } from "react-redux";
import Poster from './Poster'
import Games from "./Games";
import { useEffect, useState } from "react";

export default function Posters(){
    const all_games = useSelector((state)=>state.games)
    const [current_poster, set_current_p] = useState({}) 
    function get_random_posters() {
        let random_g_ind = Math.floor(Math.random()*all_games.length-1)
        let random_game = all_games[random_g_ind]
        if(random_game.screenshots == undefined ) return
        
        // console.log(random_game, random_g_ind);
        let random_s_ind = Math.floor(Math.random()*(random_game.screenshots.length-1))
        let random_screenshot = random_game.screenshots[random_s_ind]

        if(typeof(random_screenshot) == 'number') return
        
        // console.log(random_s_ind,random_game.screenshots.length ,random_screenshot);
        // console.log(typeof(random_screenshot));
        return {game: random_game,screenshoot: random_screenshot}
        
        // let random_screenshot_ind = 
        // all_games[random_g_ind].screenshots[]
    }
    useEffect(()=>{
        let random_p =get_random_posters()
        
        set_current_p(random_p)
        setInterval(() => {
            let random_p =get_random_posters()
        
            set_current_p(random_p)
        }, 6000);
    }, [])
    if(current_poster == {} || current_poster == undefined) return
    return(
        <div className="posters" style={{backgroundImage:`url(${current_poster.screenshoot})`}}>
            <Poster game={current_poster.game} />
        </div>
    )
}