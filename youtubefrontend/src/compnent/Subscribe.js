import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getD, getSlug, getToken, storeToken } from '../services/LocalStorageService';
import { useSubscribeUserMutation } from '../services/youtubeapi';
import { setUserInfo } from '../features/usertoken/userinfoSlice';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import { NavLink } from 'react-router-dom';

const Subscribe = (props) => {
  
  const ai = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })
  const { access_token } = useSelector(state => state.auth)
  const { refresh_token } = useSelector(state => state.token)
  const x = useSelector(state => state.auth)

  const store_slug = getSlug()

  const a = getToken()

  const [SubscribeUser, res_a] = useSubscribeUserMutation()
  const [s, setSubscriber] = useState()

  const [items, setitems] = useState()
  
  
  // --------------------------------------------
  
  const dispatch = useDispatch()
  
  useEffect( () => {
    async function getUser() {
      try {
        const response = await ai.get(`/videos/${store_slug.slug}/`);
        setitems(response.data.creator.subscribers)
        if (items != []){

          const idd = getD()
          let x1 = 'Subscribe'
          items.map((value)=>{
            value.id == idd.u ? x1 = 'Subscribed' : console.log()
          })
          
          setSubscriber(x1)       
          dispatch( setUserInfo(items.length) )
          
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  })

  
  
  // ------------------------------------------
  
  const [notify, setnotify] = useState(false)
  const [showA, setShowA] = useState(true);
  
  const handleClickU = async () => {
    
    if (x.access_token){
        // --------------------------------------
        if (props.userchannel){
          const actualData = props.userchannel.creator.username
          const access_token = a.access_token
          const res = await SubscribeUser({actualData, access_token})


                            // ----------------------------------------------------------------------
                            

                            if (access_token != null && res.error){
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

                            
                            // ----------------------------------------------------------------------

          
        } else if(props.userchannel2){
          const actualData = props.userchannel2.data.user.username
          const access_token = a.access_token
          const res = await SubscribeUser({actualData, access_token})



                             // ----------------------------------------------------------------------
                            

                             if (access_token != null && res.error){
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

                            
                            // ----------------------------------------------------------------------


 
        }
        setnotify(false)
        // --------------------------------------
    } else if(x.access_token == null) {


      setnotify(true)
      setShowA(!showA);
    

    }

}












  return (
    <>


      {(s!=null && s=='Subscribed' && x.access_token) ? <Button className='float-end' onClick={() => handleClickU()} variant="secondary">{s}</Button> : <Button className='float-end' onClick={handleClickU} variant="danger">{s}</Button>}
   

{
  notify ?  <Toast className='float-end' style={{ background:'rgb(33, 33, 33)' }} show={showA} onClose={handleClickU}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Unauthorized</strong>
          </Toast.Header>
          <Toast.Body>
           Want to subscribe to this channel?
           <p>
                 Sign in to subscribe to this channel.
           </p> 

        <NavLink to="/login" style={{textDecoration: 'none', color:'#0d6efd'}}>
          login
        </NavLink>  
          
</Toast.Body>
        </Toast> : <></>
}



    </>
  )
}

export default Subscribe


