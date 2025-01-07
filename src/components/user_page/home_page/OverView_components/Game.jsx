import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searching } from "../../../../redux_store/user/userSlice.js";
import Favoritesbtn from "../Favoritesbtn.jsx"

export default function Game({ game }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const is_searching = useSelector((state) => state.user.searching);
  const user = useSelector((state)=> state.user)
  
  
  console.log(is_searching);
 
  return (
    <div>
    <div
      className="game card"
      onClick={() => {
        dispatch(searching(false));
        navigate(`game/${game.id}`);
      }}
    >
      <img src={game.cover} />
      <h2 className="card__title">{game.name}</h2>
    </div>
    <Favoritesbtn game={game} user={user} />
    </div>
  );
}
