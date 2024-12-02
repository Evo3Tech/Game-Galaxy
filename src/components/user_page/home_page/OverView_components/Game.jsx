import { useNavigate } from "react-router-dom"


export default function Game({game}){
    const navigate = useNavigate()
    return(
        <div className="game card" onClick={()=>{navigate(`game/${game.id}`)}}>
              <img src={game.cover}/>
              <h2 className="card__title">{game.name}</h2>
        </div>
    )
}