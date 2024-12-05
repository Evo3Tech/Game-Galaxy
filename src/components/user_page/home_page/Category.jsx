import "../../../css/user_page/Category.css"
export default function Category({game}) {
  return (
    
      
      <div className="cat-card-grid-space">
    <div className="cat-card" style={{backgroundImage: `url(${game.cover})`,}}>
      <div className="cat-bg-title">
        <h1>{game.name}</h1>
        {/* <p>{game.summary}</p> */}
        <div className="cat-tags">
          <div className="cat-tag">{game.game_modes}</div>
        </div>
      </div>
    </div>
  </div>
      
    
  )
}
