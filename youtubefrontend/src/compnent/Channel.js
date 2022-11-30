import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useUserchanneldetailQuery } from '../services/youtubeapi'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Channel = () => {



  const { access_token } = useSelector(state => state.auth)
  const res = useUserchanneldetailQuery(access_token)

  const [d, setD] = useState()

  useEffect(()=>{
    if (res.data && res.isSuccess){
      setD(res.data)
      console.log(res)
    }
  })



  return (
    <>



<ul className="nav px-4">
      
      <li className="nav-item pt-4">
        <NavLink to="/userprofile" style={{textDecoration: 'none', color:'gray'}}>
            account
        </NavLink>
      </li>

      <li className="nav-item pt-4 mx-4">
      <NavLink to="/channel" style={{textDecoration: 'none', color:'#0d6efd'}}>
            channel
        </NavLink>
      </li>

      <li className="nav-item pt-4">
      <NavLink to="/videos" style={{textDecoration: 'none', color:'gray'}}>
            videos
        </NavLink>
      </li>
 
    </ul>





  






























    <h1>{
  d != null ? <>
















  <Card style={{background:'#212121'}} className='mx-4 mt-4'>
      
      <div className='text-center'>
        <Card.Img variant="top" style={{height:'200px'}} src={`http://127.0.0.1:8000/.${d.user_image}`} />
      </div>
      <div className='text-center'>
      Banner Image
      </div>
      
      <div className='text-center mt-3'>
        <Card.Img variant="top" className='rounded-circle' style={{height:'200px', width:'200px'}} src={`http://127.0.0.1:8000/.${d.user_image}`} />
      </div>
      <div className='text-center mt-3'>
      Profile Picture
      </div>
      
      <Card.Body>
        <Card.Text>
         

        <div className='mx-4 mt-4'>


<div className="mb-3 row">
  <label for="staticEmail" className="col-sm-3 col-form-label">Username</label>
  <div className="col-sm-9">
    <input type="text" disabled={true} className="form-control-plaintext" style={{color:'gray'}} id="staticEmail" value={d.username}  />
  </div>
</div>

<div className="mb-3 row">
  <label for="staticEmail" className="col-sm-3 col-form-label">Bio</label>
  <div className="col-sm-9">
    <input type="text" disabled={true} className="form-control-plaintext" style={{color:'gray'}} id="staticEmail" value={d.bio}  />
  </div>
</div>


</div>


         
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
  </Card>


  
  </> : <></>
  
  }</h1>









    
    </>
  )
}

export default Channel