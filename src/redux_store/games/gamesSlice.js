import { createSlice } from "@reduxjs/toolkit";

let all_games = await fetch('http://localhost:1231/all_Games')
    .then((res)=>res.json())
export const gamesSlice = createSlice(
    {
        name: 'games',
        initialState: all_games,
        reducers: {
            get_all_games: (state, action) => {state = action.payload}
        }
    }
)

export const {get_all_games} = gamesSlice.actions
export default gamesSlice.reducer