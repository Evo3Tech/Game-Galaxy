import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice(
    {
        name: 'games',
        initialState: [],
        reducers: {
            get_all_games: (state, action) => {state = action.payload},
            set_all_games: (state, action) => {return action.payload}
        }
    }
)

export const {get_all_games, set_all_games} = gamesSlice.actions
export default gamesSlice.reducer