import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access_token: null,
}

export const userSlice = createSlice({
  name: 'access_token',
  initialState,
  reducers: {
    setUserToken:(state, action) => {
        state.access_token = action.payload.access_token
    },
    unSetUserToken:(state, action) => {
        state.access_token = action.payload.access_token
    },
  },
})

export const { setUserToken, unSetUserToken } = userSlice.actions

export default userSlice.reducer