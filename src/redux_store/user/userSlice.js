import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice(
    {
        name: 'user',
        initialState : {
            info: null,
            search: '',
            searching: false,
            favorites:[]
        },
        reducers: {
            log_in: (state, action) => {state.info = action.payload},
            search: (state, action) => {state.search = action.payload},
            searching: (state, action) => {state.searching = action.payload},
            favorites: (state, action) => {state.favorites.push(action.payload)},
        }
    }
)

export const {log_in, search, searching,favorites} = userSlice.actions
export default userSlice.reducer