import { useEffect, useState } from "react";
import Category from "./category";
import "../../../css/user_page/Category.css"
export default function Categorys() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:1231/all_Games")
      .then((data) => data.json())
      .then((res) => {setdata(res);
      res.forEach((game) => {
        console.log(game.genres); // Log the genres for each game
      });});
  }, []);
  return (
    <div className="containers-categorys">
        <div className="category">
        
            <h1 className='title'>Adventure</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Adventure")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      
      </div>
      <div className="category">
        
            <h1 className='title'>Action</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.themes && d.themes.includes("Action")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      
      </div>

      <div className="category">
        
            <h1 className='title'>Role-Playing</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Role-playing (RPG)")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>


      <div className="category">
        
            <h1 className='title'>Simulation</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Simulator")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>


      <div className="category">
        
            <h1 className='title'>Strategy</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Strategy")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>

      <div className="category">
        
            <h1 className='title'>Racing</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Racing")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>

      <div className="category">
        
            <h1 className='title'>Sports</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Sport")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>

      <div className="category">
        
            <h1 className='title'>Puzzle</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Puzzle")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>


      <div className="category">
        
            <h1 className='title'>Horror</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.themes && d.themes.includes("Horror")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>

      <div className="category">
        
            <h1 className='title'>Sandbox</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.themes && d.themes.includes("Sandbox")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>

      <div className="category">
        
            <h1 className='title'>Open world</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.themes && d.themes.includes("Open world")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>

      <div className="category">
        
            <h1 className='title'>Music</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.genres && d.genres.includes("Music")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>


      <div className="category">
        
            <h1 className='title'>Massively Multiplayer Online MMO</h1>
            <div className="category-cont">
      {data.map((d) => {
        if(d.game_modes && d.game_modes.includes("Massively Multiplayer Online (MMO)")){
        return <Category key={d.id} game={d} />
        }
      })}
      </div>
      </div>
      
    </div>
  );
}
