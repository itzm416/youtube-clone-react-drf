import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useUservideodeleteMutation, useUservideodetailQuery } from '../services/youtubeapi'


import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';




import ListGroup from 'react-bootstrap/ListGroup';
import { storeSlug, storeUsername } from '../services/LocalStorageService';
import axios from 'axios';


const Uservideo = () => {
  
  const ai = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const { access_token } = useSelector(state => state.auth)
  const [user_video, x2] = useUservideodeleteMutation()

  const [d, setD] = useState()

  useEffect( () => {
    async function getUser() {
      try {
        const response = await ai.get(
          'api/user/uservideos/',
          {headers : {
            'authorization' : `Bearer ${access_token}`
        }}
          );

        setD(response.data)
        console.log(d )

      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  })












  // useEffect(()=>{
  //   if (res.data && res.isSuccess){
  //     setD(res.data)
  //     console.log(res.data)
  //   }
  // })

  const handleClick1 = (x) =>{
    storeSlug(x.slug)
   }

   const handleClick2 = (x) =>{
    storeUsername(x.creator.username)
   }
   
   const [successmsg, setSuccessmsg] = useState('')
   const handleClick3 = async (xx) => {
    const slug_name = xx.slug
    const aass = await user_video({slug_name, access_token})
    if(aass.data){
      setSuccessmsg(aass.data.msg)
    }
  }


  return (
    <>

<ul className="nav px-4">
      
      <li className="nav-item pt-4">
      <NavLink to="/userprofile" style={{textDecoration: 'none', color:'gray'}}>
            account
        </NavLink>
      </li>
      
      <li className="nav-item pt-4 mx-4">
      <NavLink to="/channel" style={{textDecoration: 'none', color:'gray'}}>
            channel
        </NavLink>
      </li>

      <li className="nav-item pt-4">
        <NavLink to="/videos" style={{textDecoration: 'none', color:'#0d6efd'}}>
            videos
        </NavLink>
      </li>


 
    </ul>




















    <ListGroup className='mt-4 mx-4'>
      

      { d != null ? d.map( (video, i) =>    


<CCard className="mb-2 mt-2" style={{background:'rgb(24 24 24)', maxWidth: '540px' }}>
  <CRow className="g-0">

    <CCol md={5}>  
        <NavLink to="/watchvideo">
            <CCardImage onClick={() => handleClick1(video)} style={{width:'100%'}} variant="top" src={`http://127.0.0.1:8000/.${video.video_thumbnail}`} />
        </NavLink>
    </CCol>

    <CCol md={7}>
      <CCardBody className='p-0'>

        <CCardTitle className='mb-0 mx-2'>
            <NavLink style={{textDecoration: 'none', color:'white'}} to="/watchvideo">
                <span onClick={() => handleClick1(video)} classNameName='fw-bold' style={{marginRight:8, fontSize:16}}>{video.title}</span>
            </NavLink>
        </CCardTitle>
      
        <CCardText className='mb-0 mx-2 mt-1'>
            <NavLink style={{textDecoration: 'none', color:'gray'}} to="/userchannel">
                <small onClick={() => handleClick2(video)}>{video.creator.username}</small>
            </NavLink>
        </CCardText>
        

        <CCardText className='mx-2'>
          <small style={{color:'gray'}} className="text-medium-emphasis">Last updated 3 mins ago</small>
        </CCardText>
      
        <CCardText className='mb-0 mx-2 mt-1'>
            <NavLink style={{textDecoration: 'none', color:'green'}} to="/updatevideos">
                <small onClick={() => handleClick1(video)}>Update</small>
            </NavLink>
            <NavLink className='mx-2' style={{textDecoration: 'none', color:'red'}} to="">
                <small onClick={() => handleClick3(video)}>Delete</small>
            </NavLink>
        </CCardText>

      </CCardBody>
    </CCol>
  </CRow>
</CCard>

       
       ) : <h1>Loading..</h1>
     }


</ListGroup>



{
  successmsg != '' ? <div className="alert alert-success p-1 text-center mt-4" role="alert">
  
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
  </svg>

  {successmsg}
  
  </div> : <span></span>
}





    </>
  )
}

export default Uservideo