import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice(
    {
        name: 'games',
        initialState: async ()=>{await fetch('http://localhost:1231/all_Games').then((res)=>res.json())},
        reducers: {
            get_all_games: (state, action) => {state = action.payload}
        }
    }
)

export const {get_all_games} = gamesSlice.actions
export default gamesSlice.reducer