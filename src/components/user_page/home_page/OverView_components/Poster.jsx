import { useNavigate } from "react-router-dom"

export default function Poster({game}){
    const navigate = useNavigate()
    if(game == undefined) return
    return(
        <div className="poster">
        <div className="game_title">
            <h1>
                {game.name}
            </h1>
            <span className="rating">{game.rating != null ? game.rating.toFixed(2) : 'Not released'}</span>
        </div>

        <p className="game_summary">
            {game.summary}
        </p>
        
        <span className="attr_title">Genres:</span>
        {
            game.genres == null 
            ? 'no game modes' 
            :game.genres.map((g_mode, k)=><span className="g_mode" key={k}>{g_mode}</span>)
        }
        <button className="check_game_btn" onClick={()=>{navigate('game/'+game.id)}}>Check Game</button>
        </div>
    )
}