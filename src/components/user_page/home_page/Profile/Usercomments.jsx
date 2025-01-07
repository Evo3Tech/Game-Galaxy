import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import "./small.css";
import { useNavigate } from "react-router-dom";

export default function UserComments() {
  const userID = useSelector((state)=>state.user.info.id)
  const [comments, setcomments] = useState([]);
  const [games,setGames] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch(`https://gamegalaxy-production.up.railway.app/user/comments`)
      .then((data) => data.json())
      .then((res) => {setcomments(res)});
    fetch(`https://gamegalaxy-production.up.railway.app/user/all_Games`)
      .then((data) => data.json())
      .then((res) => {setGames(res)});
  }, []);

  return (
    <div className="comments-section">
      <div className="header">
        <h1>My Comments:</h1>
      </div>
      {
        comments.filter((c)=>c.user_id == userID).length == 0
        ? <span>No comments were found</span> 
        : comments.filter((c)=>c.user_id == userID).map((comment) => (
            <div  className="comment-card" onClick={()=>{navigate('/user_interface/game/'+comment.game_id)}}>
            {games.filter((g)=>g.id == comment.game_id).map((game)=>(
              <img
              src={game.cover}
              className="game-thumbnail"
              />
              ))}
            
              <div className="comment-details">
              {games.filter((g)=>g.id == comment.game_id).map((game)=>(
                <h3 className="game-title">{game.name}</h3>
              ))}
                <p className="comment-text">"{comment.text}"</p>
              </div>
            </div>
      ))}
    </div>
  );
}
