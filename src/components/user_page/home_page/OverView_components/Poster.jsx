export default function Poster({game}){
    if(game == undefined) return
    let b = game.screenshots[0]
    return(
        <div className="poster">
        <h1>{game.name}</h1>
        </div>
    )
}