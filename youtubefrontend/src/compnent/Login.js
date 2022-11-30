import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import { useLoginUserMutation } from '../services/youtubeapi'
import Spinner from 'react-bootstrap/Spinner';
import { storeToken, getToken, storeD } from '../services/LocalStorageService'
import { useDispatch } from 'react-redux';
import { setUserToken } from '../features/usertoken/userSlice';
import { setToken } from '../features/usertoken/userToken';


function BasicExample() {


  const dispatch = useDispatch()

  const [loginUser, res_d] = useLoginUserMutation()
  
  const [error, setError] = useState({})
  const [successmsg, setSuccessmsg] = useState('')

    const [userdata, setUserdata] = useState({
        email : '',
        password : ''
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
          email : data.get('email'),
          password : data.get('password')
        }

        const res = await loginUser(actualData)

        if(res.error){
          setError(res.error.data.errors)
        }

        if(res.data){
          setError({})
          setSuccessmsg(res.data)
          setUserdata({
            email:'',
            password:''
          })

          setTimeout( () => {
            // storing token acess and refresh in the local storage
            storeToken(res.data.token)
            storeD(res.data.idd)
            // set state in slice
            let { access_token, refresh_token } = getToken()
            dispatch( setUserToken({access_token : access_token}) )
            dispatch( setToken({refresh_token : refresh_token}) )
            
          }, 3000 )

        }

      
      }

    return (

<Container className='pt-5'>
<div class="d-flex justify-content-center">

    
    <Form onSubmit={handlesubmit}>
    
    <h3 className='mb-4'>Login</h3>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={handlechangedata} value={userdata.email} type="email" name='email' placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        
        {error ? <p style={{color:'red'}}>{error.email}</p> : <small></small>}
  
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handlechangedata} value={userdata.password} type="password" name='password' placeholder="Password" />
      </Form.Group>

        {error ? <p style={{color:'red', fontSize:'14px'}}>{error.password}</p> : <small></small>}
      
        {error ? <p style={{color:'red', fontSize:'14px'}}>{error.non_field_errors}</p> : <small></small>}
      
    
    
    <p>
        <NavLink to="/userpasswordforgot" style={{textDecoration: 'none', color:'#0d6efd'}}>
            forgot password ?
        </NavLink>
    </p>


      {
        res_d.isLoading ? <Spinner animation="border" /> : <Button variant="primary" type="submit">login</Button>
      }

{
  successmsg ? <div className="alert alert-success p-1 text-center mt-4" role="alert">
  
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
  </svg>

  {successmsg.msg}
  
  </div> : <span></span>
}

    <p className='mt-3 text-center'>
        <NavLink to="/signup" style={{textDecoration: 'none', color:'#0d6efd'}}>
            create an account
        </NavLink>
    </p>
    
    </Form>
    
</div>

</Container>
  
  );
}

export default BasicExample;