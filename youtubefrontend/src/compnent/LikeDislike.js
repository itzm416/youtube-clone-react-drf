import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getD, getSlug, getToken, storeToken } from '../services/LocalStorageService';
import { useVideoLikeMutation } from '../services/youtubeapi';
import { setUserInfo } from '../features/usertoken/userinfoSlice';
import Toast from 'react-bootstrap/Toast';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const LikeDislike = (props) => {
  
  const ai = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const store_slug = getSlug()
  const a = getToken()
  const x = useSelector(state => state.auth)


  const [like, setLike] = useState()
  const [dislike, setDisLike] = useState()

  const [likebtn, setLikebtn] = useState()
  const [dislikebtn, setDisLikebtn] = useState()

  const [LikeVideofun, res_a] = useVideoLikeMutation()
 
  useEffect( () => {
    async function getUser() {
      try {
        const response = await ai.get(`/videos/${store_slug.slug}/`);
        setLike(response.data.likes)
        setDisLike(response.data.dislikes)


        if (like != []){

          const idd = getD()
          let x1 = 'like'
          like.map((value)=>{
            value.user.id == idd.u ? x1 = 'liked' : console.log()
          })

          setLikebtn(x1)
          // dispatch( setUserInfo(items.length) )

        }
        
        // --------------------------------------------------

        if (dislike != []){

          const idd = getD()
          let x1 = 'dislike'
          dislike.map((value)=>{
            value.user.id == idd.u ? x1 = 'disliked' : console.log()
          })

          setDisLikebtn(x1)
          // dispatch( setUserInfo(items.length) )

        }


      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  })

// console.log(like ? like.length : null)
  // ------------------------------------------

  const [notify, setnotify] = useState(false)
  const [showA, setShowA] = useState(true);

  const { access_token } = useSelector(state => state.auth)
  const { refresh_token } = useSelector(state => state.token)
  
  const handleClickU = async (like_name) => {

    if (x.access_token){

      const slug_name = props.video_slug.slug
      const access_token = a.access_token
      const res = await LikeVideofun({slug_name, access_token, like_name})
      setnotify(false)




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





    }else if(x.access_token == null) {
      setnotify(true)
      setShowA(!showA);
    }

}


  return (
    <>

      
{dislikebtn!=null && dislikebtn=='disliked' ?  <Button className='border-0 float-end' onClick={() => handleClickU('dislike')} style={{background:'#181818'}}><i style={{fontSize:'24px', color:'blue'}} className="fa fa-thumbs-down"></i> {dislike ? dislike.length : null} </Button> : <Button className='border-0 float-end' onClick={() => handleClickU('dislike')} style={{background:'#181818'}}><i style={{fontSize:'24px', color:'white'}} className="fa fa-thumbs-down"></i> {dislike ? dislike.length : null} </Button> }
    
{likebtn!=null && likebtn=='liked' ?  <Button className='border-0 float-end' onClick={() => handleClickU('like')} style={{background:'#181818'}}><i style={{fontSize:'24px', color:'blue'}} className="fa fa-thumbs-up"></i> {like ? like.length : null} </Button> : <Button className='border-0 float-end' onClick={() => handleClickU('like')} style={{background:'#181818'}}><i style={{fontSize:'24px', color:'white'}} className="fa fa-thumbs-up"></i> {like ? like.length : null} </Button> } 


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

export default LikeDislike


