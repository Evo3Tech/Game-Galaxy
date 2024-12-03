import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searching } from "../../../../redux_store/user/userSlice"


export default function Game({game}){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const is_searching = useSelector((state)=>state.user.searching)
    console.log(is_searching);
    
    return(
        <div className="game card" onClick={()=>{
            dispatch(searching(false))
            navigate(`game/${game.id}`)
            console.log('is_searching',is_searching);
            
        }}>
              <img src={game.cover}/>
              <h2 className="card__title">{game.name}</h2>
        </div>
    )
}