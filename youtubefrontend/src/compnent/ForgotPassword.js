import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { usePasswordresetemailMutation } from '../services/youtubeapi'
import Spinner from 'react-bootstrap/Spinner';
     
const ForgotPassword = () => {

    const [error, setError] = useState({})
    const [successmsg, setSuccessmsg] = useState('')
    const [sendresetemail, res_d] = usePasswordresetemailMutation()

    const [userdata, setUserdata] = useState({
        email : ''
      })

    const handlechangedata = (e) => {
        setUserdata({
          ...userdata,
          [e.target.name] : e.target.value
        })
      }


      const handlesubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
          email : data.get('email')
        }

        const res = await sendresetemail(actualData)

        if(res.error){
          setError(res.error.data.errors)
        }

        if(res.data){
          setError({})
          setSuccessmsg(res.data)
          setUserdata({
            email:''
          })

       

        }

      
      }


  return (
    <>


<Container className='pt-5'>
<div class="d-flex justify-content-center">

    
    <Form onSubmit={handlesubmit}>
    
    <h3 className='mb-4'>Password Reset Email</h3>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handlechangedata} value={userdata.email} type="email" name='email' placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        
        {error ? <p style={{color:'red'}}>{error.email}</p> : <small></small>}

        {error ? <p style={{color:'red', fontSize:'14px'}}>{error.non_field_errors}</p> : <small></small>}


        </Form.Text>
      </Form.Group>
      
      {
        res_d.isLoading ? <Spinner animation="border" /> : <Button variant="primary" type="submit">Send</Button>
      }

{
  successmsg ? <div className="alert alert-success p-1 text-center mt-4" role="alert">
  
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
  </svg>

  {successmsg.msg}
  
  </div> : <span></span>
}

    
    </Form>
    
</div>

</Container>






    </>
  )
}

export default ForgotPassword