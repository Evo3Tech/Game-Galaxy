import { configureStore } from "@reduxjs/toolkit";

import user_reducer from "./user/userSlice"


export const store = configureStore({
    reducer: {
        user: user_reducer
    }
})