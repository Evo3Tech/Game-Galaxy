import { useNavigate } from "react-router-dom"
import "../../../css/user_page/Category.css"
export default function Category({game}) {
  const navigate = useNavigate()
  return (
    
      
    <div className="cat-card-grid-space" onClick={()=>{navigate(`/user_interface/game/${game.id}`)}}>
      <div className="cat-card" style={{backgroundImage: `url(${game.cover})`,}}>
        <div className="cat-bg-title">
          <h1>{game.name}</h1>
          <div className="cat-tags">
            {game.game_modes.map((mode)=>{
              return (
                <div className="cat-tag">
                  {mode}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
      
    
  )
}
