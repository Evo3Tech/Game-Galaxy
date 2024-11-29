export default function Poster({game}){
    if(game == undefined) return
    let b = game.screenshots[0]
    return(
        <div className="poster">
        <h1>{game.name}</h1>
        <p className="game_summary">
            {game.summary}
        </p>
        {/* <h3 className="game_m_title">Game mode:</h3> */}
        {
            game.game_modes == null 
            ? 'no game modes' 
            :game.game_modes.map((g_mode)=><span className="g_mode">{g_mode}</span>)
        }
        {/* <br />
        <span className="game_m_title">Genres:</span>
        {
            game.genres == null 
            ? 'no genres' 
            :game.genres.map((g_mode)=><span className="g_mode">{g_mode}</span>)
        } */}
        </div>
    )
}