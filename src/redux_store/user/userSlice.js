import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info : null
}

export const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            log_in: (state, action) => {state.info = action.payload}
        }
    }
)

export const {log_in} = userSlice.actions
export default userSlice.reducer