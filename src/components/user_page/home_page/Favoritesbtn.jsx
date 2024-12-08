import React from 'react'
import { useDispatch } from 'react-redux'
import { favorites } from '../../../redux_store/user/userSlice'
export default function Favoritesbtn({game,user}) {
  const dispatch = useDispatch()
  async function hundlerclick(){
      let infoFavorit={
        Username: user.info.name,
        Game: game
      }
      try {
        const response = await fetch("http://localhost:1231/favorite", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(infoFavorit)
        })
        if(response.ok){
            dispatch(favorites(await response.json()))
            
        }
        else{
            throw new Error(await response.text())
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div>
        <button className="favorite_btn" onClick={hundlerclick}>favorite</button>
    </div>
  )
}
