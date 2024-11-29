

export default function Game({game}){
    console.log(game);
    
    return(
        <div className="game">
            <div className="card">
  <img
    className="card__background"
    src={game.cover}/>
  <div className="card__content | flow">
    <div className="card__content--container | flow">
      <h2 className="card__title">{game.name}</h2>
    </div>
    <button className="card__button">Read more</button>
  </div>
</div>
        </div>
    )
}