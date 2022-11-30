import React, { useEffect } from 'react'
import Layout from './pages/Layout'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Watchvideo from './compnent/Watchvideo'
import Video from './compnent/Video'
import UserChannel from './compnent/UserChannel'
import Login from './compnent/Login'
import Signup from './compnent/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, storeToken } from './services/LocalStorageService'
import { setUserToken } from './features/usertoken/userSlice'
import axios from 'axios'
import { setToken } from './features/usertoken/userToken'
import EmailVerify from './compnent/EmailVerify'
import Profile from './compnent/Profile'
import Account from './compnent/Account'
import Channel from './compnent/Channel'
import Uservideo from './compnent/Uservideo'
import Videoupdate from './compnent/Videoupdate'
import VideoUpload from './compnent/VideoUpload'
import ForgotPassword from './compnent/ForgotPassword'
import PasswordReset from './compnent/PasswordReset'

const App = () => {

  let x = getToken()
  const dispatch = useDispatch()
  dispatch( setUserToken({access_token : x.access_token}) )
  dispatch( setToken({refresh_token : x.refresh_token}) )


  const { access_token } = useSelector(state => state.auth)
  const { refresh_token } = useSelector(state => state.token)
  

  const ai = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })



useEffect( () => {
  async function getUser() {

    try {
      const response = await ai.post(`/api/token/verify/`, 
        {
          token:`${access_token}`
        }
      );
    } catch (error) {

      if (access_token != null){
          // ----------------------------------------------------

          async function getUsers() {
            try {
              const response = await ai.post(`/api/token/refresh/`,
              {
                refresh:`${refresh_token}`
              }
              );
              console.log(response.data.access);
 
              let as = getToken()

              const value = {
                access : response.data.access,
                refresh : as.refresh_token
              }

              storeToken(value)
              // let aa = getToken()
              // dispatch( setUserToken({access_token : response.data.access}) )
 
            } catch (error) {
              console.log(error);
            }
          }getUsers()

          // console.log(error.response.request.status);
          // ----------------------------------------------------
        }

  }


}
getUser()
})
  



  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Video />} />
          <Route path='watchvideo' element={<Watchvideo />} />
          <Route path='userchannel' element={<UserChannel />} />
          <Route path='userpasswordforgot' element={<ForgotPassword />} />
          {/* ------------------------------------------------------------- */}
          <Route path='userprofile' element={ access_token ? <Profile /> : <Navigate to='/' /> } />
          <Route path='account' element={ access_token ? <Account /> : <Navigate to='/' /> } />
          <Route path='channel' element={ access_token ? <Channel /> : <Navigate to='/' /> } />
          <Route path='videos' element={ access_token ? <Uservideo /> : <Navigate to='/' /> } />
          <Route path='updatevideos' element={ access_token ? <Videoupdate /> : <Navigate to='/' /> } />
          <Route path='uploadvideos' element={ access_token ? <VideoUpload /> : <Navigate to='/' /> } />
          {/* ------------------------------------------------------------- */}
          <Route path='login' element={ !access_token ? <Login /> : <Navigate to='/' />} />
          <Route path='signup' element={ !access_token ? <Signup /> : <Navigate to='/' /> } />
          
          <Route path='verify-user-email/:uid/:token' element={<EmailVerify />} />
          <Route path='reset/:uid/:token' element={<PasswordReset />} />

        </Route>

        <Route path='*' element={<h1>Error 404</h1>} />
        
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App