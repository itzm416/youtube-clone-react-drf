import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';


import { NavLink } from 'react-router-dom'


import ListGroup from 'react-bootstrap/ListGroup';
import { getSlug } from '../services/LocalStorageService';
import { useUploaduservideoMutation } from '../services/youtubeapi';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VideoUpload = () => {
    
    let navigate = useNavigate();
    const { access_token } = useSelector(state => state.auth)
    const [updatevideo, res_d] = useUploaduservideoMutation()
    const [successmsg, setSuccessmsg] = useState('')

    const [titlename, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [thumbnail, setThumbnail] = useState('');
    const [videofile, setVideoFile] = useState('');

    
    const handlechangedata = (e) => {
        settitle(e.target.value)
      }
      
    const handlechangedata22 = (e) => {
        setdesc(e.target.value)
    }
    
    const handlechangedata1 = (e) => {
        setThumbnail(e.target.files[0]) 
    }
    
    const handlechangedata2 = (e) => {
        setVideoFile(e.target.files[0])
    }



    const handlesubmit = async (e) => {
        e.preventDefault()

        const actualData = new FormData()
        
        
        if (titlename != ''){
            actualData.append('title', titlename)
        }
        if (thumbnail != ''){
            actualData.append('video_thumbnail', thumbnail)
        }
        if (videofile != ''){
            actualData.append('video_file', videofile)
        }
        if (desc != ''){
            actualData.append('desc', desc)
        }

        const aass = await updatevideo({actualData, access_token})
        
        if(aass.data){
          setSuccessmsg(aass.data.msg)
          settitle('')
          setThumbnail('');
          setVideoFile('');
        
        
          setTimeout( () => {
          
            navigate('/videos')
            
          }, 3000 )

        
        }
    
      
      }




  return (
    <>


  <Form onSubmit={handlesubmit}>

<div className='mx-4 mt-4'>


  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Title</label>
    <div className="col-sm-9">
        
        <Form.Control required onChange={handlechangedata} value={titlename} type="text" placeholder="Title" />
      
    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Desc</label>
    <div className="col-sm-9">
        
        <Form.Control required onChange={handlechangedata22} value={desc} as="textarea" placeholder="Desc" />
      
    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Thumbnail</label>
    <div className="col-sm-9">
      
      <Form.Control required onChange={handlechangedata1} type="file" />
    
    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Video</label>
    <div className="col-sm-9">
    
      <Form.Control required onChange={handlechangedata2} type="file" />
   
    </div>
  </div>


  <button type="submit" class="btn btn-primary mt-3">Save</button>

  {
  successmsg != '' ? <div className="alert alert-success p-1 text-center mt-4" role="alert">
  
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
  </svg>

  {successmsg}
  
  </div> : <span></span>
}

 
  
</div>
  
</Form>







    </>
  )
}

export default VideoUpload