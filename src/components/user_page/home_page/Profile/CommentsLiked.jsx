import { useSelector } from "react-redux";
import "./small.css";
import { useEffect, useState } from "react";

export default function CommentsLiked() {
  const userLikes = useSelector((state)=>state.user.info.liked)
  const [comments, setcomments] = useState([]);
  const [games,setGames] = useState([])
  console.log(games);
  
  useEffect(() => {
    fetch("http://localhost:1231/comments")
      .then((data) => data.json())
      .then((res) => {setcomments(res)});
    fetch("http://localhost:1231/all_Games")
      .then((data) => data.json())
      .then((res) => {setGames(res)});
  }, []);

  return (
    <div className="comments-section">
      <h1>Liked Comments </h1>
      <hr />
      {comments.filter((c)=> userLikes.includes(c.comment_id)).map((comment) => (
        <div  className="comment-card">
        {games.filter((g)=>g.id == comment.game_id).map((game)=>(
          <img
          src={game.cover}
          alt={`Thumbnail for ${game.name}`}
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

