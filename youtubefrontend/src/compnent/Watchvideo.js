import React, { useEffect, useState } from 'react'
import { getSlug, getToken } from '../services/LocalStorageService'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { storeSlug, storeUsername } from '../services/LocalStorageService'
import { useGetAllVideosQuery, useGetVideoQuery, useSubscribeUserMutation } from '../services/youtubeapi'
import { BigPlayButton, ControlBar, ForwardControl, Player, ReplayControl } from 'video-react';
import moment from 'moment';

import Button from 'react-bootstrap/Button';


import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';




import ListGroup from 'react-bootstrap/ListGroup';


// import "node_modules/video-react/dist/video-react.css";
import '../../node_modules/video-react/dist/video-react.css'
import Subscribe from './Subscribe';
import { useSelector } from 'react-redux';
import LikeDislike from './LikeDislike';
import axios from 'axios';

const Watchvideo = () => {


    const ai = axios.create({
        baseURL : 'http://127.0.0.1:8000'
      })

    const [slug, setSlug] = useState()
    const [res, setRes] = useState()
    
    const [res_video, setRes_Video] = useState()
    const store_slug = getSlug()
    const res_x = useGetVideoQuery(slug)
    
    const res_data = useGetAllVideosQuery()
    
    useEffect(()=>{
        setSlug(store_slug.slug)
        if (res_x.isSuccess){
            setRes_Video(res_x.data)
        }
        if (res_data.isSuccess){
            setRes(res_data.data)
        }

    })
    
   const handleClick1 = (x) =>{
    

    async function getUser() {
        try {
          const ass = await ai.get(`countview/${x.slug}/`);
        } catch (error) {
          console.error(error);
        }
      }
      getUser()

    
    storeSlug(x.slug)
    setSlug(x.slug)
   }

   const handleClick2 = (x) =>{
    storeUsername(x.creator.username)
   }


   const { userinfo } = useSelector(state => state.user_info)
   const [count, setCount] = useState(userinfo)

   
    useEffect(()=>{
        setCount(userinfo)
    },[userinfo])

  

        return (
            <>
    
<div className='container-fluid px-3'>
      <Row>


{ res_video ? <Col xs={12} sm={12} md={12} lg={8} className="mt-3 px-0">
        <Card style={{background:'rgb(24 24 24)'}} className='border-0'>
            
            <Player autoPlay={true} poster={`http://127.0.0.1:8000/.${res_video.video_thumbnail}`} src={`http://127.0.0.1:8000/.${res_video.video_file}`}>
                <BigPlayButton position="center" />
                <ControlBar autoHide={true}>
                    <ReplayControl seconds={10} order={2.2} />
                    <ForwardControl seconds={10} order={3.2} />
                </ControlBar>
            </Player>

            <Card.Title className='mb-3 mt-3'>
                    <span className='fw-bold' style={{marginRight:8, fontSize:16, color:'white'}}>{res_video.title}</span>
            </Card.Title>

            <Card.Text className='mb-0'>
                    <small style={{marginRight:8, fontSize:16, color:'gray'}}>
                    
    {/* ----------------------------------------------- */}


        <LikeDislike video_slug={res_video} />
       
                  
    {/* ----------------------------------------------- */}
                  
                    </small>
            </Card.Text>

<hr className='mt-2 mb-2' style={{color:'gray'}} />

            <Card.Body style={{background:'rgb(24 24 24)'}} className='px-0 py-2'>
                <Card.Title className='mb-0'>
                    <NavLink to="/userchannel">
                        <img onClick={() => handleClick2(res_video)} src={`http://127.0.0.1:8000/.${res_video.creator.user_image}`} style={{marginRight:8}} alt="mdo" width="40" height="40" className="rounded-circle" />
                    </NavLink>
                            
                    <NavLink style={{textDecoration: 'none', color:'white'}} to="/userchannel">
                        <small onClick={() => handleClick2(res_video)}>{res_video.creator.username}</small>
                    </NavLink>


{/* ----------------------------------------------------------- */}

                    <Subscribe userchannel={res_video} />
               
{/* ----------------------------------------------------------- */}
               

                </Card.Title>
                
                <Card.Title className='mb-0 mx-5'>
                    <small style={{fontSize:15, color:'gray'}}>
                         {count}subscribers
                    </small>
                </Card.Title>

            </Card.Body>
        </Card>

    </Col> : <h5>loading..</h5>

 }

 <Col xs={12} sm={12} md={12} lg={4}>

<ListGroup className='mt-3'>
      

      { res != null ? res.filter( (video) => video.slug !== slug ).map( (video, i) =>    


<CCard className="mb-2" style={{background:'rgb(24 24 24)', maxWidth: '540px' }}>
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
          <small style={{color:'gray'}} className="text-medium-emphasis">{moment(`${video.uploaded_at}`).fromNow()}</small>
        </CCardText>
      
      </CCardBody>
    </CCol>
  </CRow>
</CCard>

       
       ) : <h1>Loading..</h1>
     }


</ListGroup>

 </Col>
{/* ----------------------------------------------------------------- */}

</Row>



</div>
    </>
  )
}

export default Watchvideo