import { configureStore } from "@reduxjs/toolkit";

import user_reducer from "./user/userSlice"
import games_reducer from "./games/gamesSlice"


export const store = configureStore({
    reducer: {
        user: user_reducer,
        games: games_reducer
    }
})