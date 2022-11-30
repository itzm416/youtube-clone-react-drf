import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';


import { NavLink } from 'react-router-dom'


import ListGroup from 'react-bootstrap/ListGroup';
import { getSlug } from '../services/LocalStorageService';
import { useGetVideoQuery, useUpdateuservideoMutation } from '../services/youtubeapi';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Videoupdate = () => {
    
    let navigate = useNavigate();
    const { access_token } = useSelector(state => state.auth)
    const [updatevideo, res_d] = useUpdateuservideoMutation()
    const [successmsg, setSuccessmsg] = useState('')

    const store_slug = getSlug()
    const res_x = useGetVideoQuery(store_slug.slug)

    const [res_video, setRes_Video] = useState()

    useEffect(()=>{
        if (res_x.isSuccess){
            setRes_Video(res_x.data)
        }
    })

    const [titlename, settitle] = useState('')
    const [thumbnail, setThumbnail] = useState('');
    const [videofile, setVideoFile] = useState('');

    
    const handlechangedata = (e) => {
        settitle(e.target.value)
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

        const slug_name = store_slug.slug
        console.log(slug_name)
        console.log(actualData)

        const aass = await updatevideo({actualData, slug_name, access_token})
        
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


<ListGroup className='mt-4 mx-4'>
      

      { res_video != null ? <CCard className="mb-2 mt-2" style={{background:'rgb(24 24 24)', maxWidth: '540px' }}>
  
  
  <CRow className="g-0">

    <CCol md={5}>  
        <NavLink to="">
            <CCardImage onClick={() => null} style={{width:'100%'}} variant="top" src={`http://127.0.0.1:8000/.${res_video.video_thumbnail}`} />
        </NavLink>
    </CCol>

    <CCol md={7}>
      <CCardBody className='p-0'>

        <CCardTitle className='mb-0 mx-2'>
            <NavLink style={{textDecoration: 'none', color:'white'}} to="">
                <span onClick={() => null} classNameName='fw-bold' style={{marginRight:8, fontSize:16}}>{res_video.title}</span>
            </NavLink>
        </CCardTitle>
      
        <CCardText className='mb-0 mx-2 mt-1'>
            <NavLink style={{textDecoration: 'none', color:'gray'}} to="">
                <small onClick={() => null}>{res_video.creator.username}</small>
            </NavLink>
        </CCardText>
        

        <CCardText className='mx-2'>
          <small style={{color:'gray'}} className="text-medium-emphasis">Last updated 3 mins ago</small>
        </CCardText>
      
      

      </CCardBody>
    </CCol>
  </CRow>










  <Form onSubmit={handlesubmit}>

<div className='mx-4 mt-4'>


  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Title</label>
    <div className="col-sm-9">
        
        <Form.Control onChange={handlechangedata} value={titlename} type="text" placeholder="Title" />
      
    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Thumbnail</label>
    <div className="col-sm-9">
      
      <Form.Control onChange={handlechangedata1} type="file" />
    
    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Video</label>
    <div className="col-sm-9">
    
      <Form.Control onChange={handlechangedata2} type="file" />
   
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



</CCard> : <h1>Loading..</h1>
     

}


</ListGroup>


    </>
  )
}

export default Videoupdate