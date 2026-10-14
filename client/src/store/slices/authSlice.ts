import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: localStorage.getItem('token'), 
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            localStorage.setItem('token', action.payload)
            state.accessToken = action.payload
        },

        logout: (state) => {
            localStorage.removeItem('token')
            state.accessToken = null;
        }
    }
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer