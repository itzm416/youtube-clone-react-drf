import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useGetUserChannelQuery } from '../services/youtubeapi'
import { NavLink } from 'react-router-dom';
import { storeUsername, storeSlug } from '../services/LocalStorageService'
import { getUsername } from '../services/LocalStorageService'
import Subscribe from './Subscribe';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function ResponsiveAutoExample() {
  
  const { userinfo } = useSelector(state => state.user_info)

  const { username } = getUsername()
  const res = useGetUserChannelQuery(username)

  const [count, setCount] = useState(userinfo)

  useEffect(()=>{
    setCount(userinfo)
  },[userinfo])

  if (res.isSuccess){
    console.log(res)
  }

  const handleClick1 = (video) => {
    storeSlug(video.slug)
  }
  
  const handleClick2 = (video) => {
    storeUsername(video.creator.username)
  }

  return (
    <Container>
      <Row>

      { res.isSuccess ? 
           
            <Col xs={12} sm={12} md={12} lg={12} style={{height:'40vh'}} className="mt-3 px-2">
        

                    <Card className='border-0'>

    <Card.Img variant="top" width='100%' height='250vh' src={`http://127.0.0.1:8000/.${res.data.user.user_banner}`} />

    <Card.Body style={{background:'rgb(24 24 24)'}} className='px-0 py-2'>

        <Card.Text className='mb-0'>
                <img src={`http://127.0.0.1:8000/.${res.data.user.user_image}`} style={{marginRight:8}} alt="mdo" width="60" height="60" className="rounded-circle" />
                
                <span className='fw-bold' style={{marginRight:8, fontSize:25}}>{res.data.user.username}</span>


{/* ----------------------------------------------------------- */}

<Subscribe userchannel2={res} />
               
{/* ----------------------------------------------------------- */}
                             


        </Card.Text>

        <Card.Text style={{marginLeft:65, fontSize:18, color:'gray'}}>
            <small>{count}subscribers</small>
        </Card.Text>

    </Card.Body>

</Card>



            </Col>
        
         : <h1>Loading..</h1>
      
      }

      </Row>



      <Row>

      { res.isSuccess ? res.data.videos.map( (video, i) =>    
           
            <Col key={i} xs={12} sm={6} md={4} lg={3} className="mt-5 px-2">
            <Card className='border-0'>

            <NavLink to="/watchvideo">
                <Card.Img onClick={() => handleClick1(video)} variant="top" src={`http://127.0.0.1:8000/.${video.video_thumbnail}`} />
            </NavLink>

                <Card.Body style={{background:'rgb(24 24 24)'}} className='px-0 py-2'>

                    <Card.Title className='mb-0'>
                            <NavLink style={{textDecoration: 'none', color:'white'}} to="/userchannel">
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
                        <small>100k . 1hour ago</small>
                    </Card.Text>

                </Card.Body>

            </Card>
            </Col>
        
        ) : <h1>Loading..</h1>
      }

      </Row>
  


















    </Container>













  );
}

export default ResponsiveAutoExample;