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
      
    </div>
  );
}
