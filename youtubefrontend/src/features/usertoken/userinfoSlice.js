import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userinfo:null
}

export const userinfoSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo:(state, action) => {
        state.userinfo = action.payload
    },
    unSetUserInfo:(state, action) => {
        state.userinfo = action.payload
    },
  },
})

export const { setUserInfo, unSetUserInfo } = userinfoSlice.actions

export default userinfoSlice.reducer