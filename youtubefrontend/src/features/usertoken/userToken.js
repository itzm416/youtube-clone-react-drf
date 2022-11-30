import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  refresh_token: null,
}

export const userToken = createSlice({
  name: 'refresh_token',
  initialState,
  reducers: {
    setToken:(state, action) => {
        state.refresh_token = action.payload.refresh_token
    },
    unSetToken:(state, action) => {
        state.refresh_token = action.payload.refresh_token
    },
  },
})

export const { setToken, unSetToken } = userToken.actions

export default userToken.reducer