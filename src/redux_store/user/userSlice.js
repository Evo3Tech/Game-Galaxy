import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice(
    {
        name: 'user',
        initialState : {
            info: null,
            search: '',
            searching: false
        },
        reducers: {
            log_in: (state, action) => {state.info = action.payload},
            search: (state, action) => {state.search = action.payload},
            searching: (state, action) => {state.searching = action.payload},
            favorites: (state, action) => {state.info.favorites.push(action.payload)},
            rm_favorites: (state, action) => {state.info.favorites = state.info.favorites.filter((f_g)=> f_g != action.payload)},
            add_to_liked: (state, action) => {state.info.liked.push(action.payload)},
            rm_from_liked: (state, action) => {state.info.liked = state.info.liked.filter((s)=>s != action.payload)}
        }
    }
)

export const {log_in, search, searching, add_to_liked, rm_from_liked, favorites, rm_favorites} = userSlice.actions


export default userSlice.reducer