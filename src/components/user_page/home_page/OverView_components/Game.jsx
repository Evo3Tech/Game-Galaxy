

export default function Game({game}){
    console.log(game);
    
    return(
        <div className="game card">
              <img src={game.cover}/>
              <h2 className="card__title">{game.name}</h2>
        </div>
    )
}