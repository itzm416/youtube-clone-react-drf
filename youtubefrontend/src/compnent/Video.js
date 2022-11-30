import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useUserchanneldetailQuery } from '../services/youtubeapi'
import { NavLink } from 'react-router-dom';
import { storeSlug, storeUsername, storeUserprofilepic } from '../services/LocalStorageService'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function ResponsiveAutoExample() {
  
  const ai = axios.create({
    baseURL : 'http://127.0.0.1:8000'
  })

  const { access_token } = useSelector(state => state.auth)
  const response = useUserchanneldetailQuery(access_token)

  useEffect(()=>{
    if (response.data && response.isSuccess){
      storeUserprofilepic(response.data.user_image)
    }
  })

  const [res, setD] = useState()

  useEffect( () => {
    async function getUser() {
      try {
        const ass = await ai.get('videos/');
        if (ass.status === 200){
          setD(ass)

        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  })


  const handleClick1 = (video) => {

    async function getUser() {
      try {
        const ass = await ai.get(`countview/${video.slug}/`);
      } catch (error) {
        console.error(error);
      }
    }
    getUser()

    storeSlug(video.slug)
  }
  
  const handleClick2 = (video) => {
    storeUsername(video.creator.username)
  }
  
  return (
    <div className='container-fluid px-2'>
      <Row>

      { res != null ? res.data.map( (video, i) =>    
           
            <Col key={i} xs={12} sm={6} md={4} lg={3} className="mt-3 px-2">
            <Card className='border-0'>

            <NavLink to="/watchvideo">
                <Card.Img onClick={() => handleClick1(video)} variant="top" src={`http://127.0.0.1:8000/.${video.video_thumbnail}`} />
            </NavLink>

                <Card.Body style={{background:'rgb(24 24 24)'}} className='px-0 py-2'>

                    <Card.Title className='mb-0'>
                            <NavLink style={{textDecoration: 'none', color:'black'}} to="/userchannel">
                            <img onClick={() => handleClick2(video)} src={`http://127.0.0.1:8000/.${video.creator.user_image}`} style={{marginRight:8}} alt="mdo" width="30" height="30" className="rounded-circle" />
                            </NavLink>
                            
                            <NavLink style={{textDecoration: 'none', color:'white'}} to="/watchvideo">
                              <span onClick={() => handleClick1(video)} className='fw-bold' style={{marginRight:8, fontSize:16}}>{video.title}</span>
                            </NavLink>
                            
                    </Card.Title>

                    <Card.Text style={{marginLeft:36, marginTop:4, fontSize:15, marginBottom:0}}>
                            <NavLink style={{textDecoration: 'none', color:'white'}} to="/userchannel">
                              <small onClick={() => handleClick2(video)}>{video.creator.username}</small>
                            </NavLink>
                    </Card.Text>

                    <Card.Text style={{marginLeft:36, fontSize:15, color:'white'}}>
                       <small>  {video.views} views . {moment(`${video.uploaded_at}`).fromNow()}</small>
                    </Card.Text>

                </Card.Body>

            </Card>
            </Col>
        
        ) : <h1>Loading..</h1>
      }

      </Row>
    </div>
  );
}

export default ResponsiveAutoExample;