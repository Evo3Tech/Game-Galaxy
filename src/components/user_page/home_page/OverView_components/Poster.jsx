export default function Poster({game}){
    if(game == undefined) return
    let b = game.screenshots[0]
    return(
        <div className="poster">
        <div className="game_title">
            <h1>
                {game.name}
            </h1>
            <span className="rating">{game.rating.toFixed(2)}</span>
        </div>

        <p className="game_summary">
            {game.summary}
        </p>
        {/* <h3 className="game_m_title">Game mode:</h3> */}
        
        <span className="attr_title">Genres:</span>
        {
            game.genres == null 
            ? 'no game modes' 
            :game.genres.map((g_mode)=><span className="g_mode">{g_mode}</span>)
        }
        {/* <br />
        <span className="game_m_title">Genres:</span>
        {
            game.genres == null 
            ? 'no genres' 
            :game.genres.map((g_mode)=><span className="g_mode">{g_mode}</span>)
        } */}
        <button className="check_game_btn">Check Game</button>
        </div>
    )
}