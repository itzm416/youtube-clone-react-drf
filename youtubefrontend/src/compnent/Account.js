import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useUpdateuseraccountMutation, useUseraccountdetailQuery } from '../services/youtubeapi'
import Form from 'react-bootstrap/Form';

const Account = () => {

  const { access_token } = useSelector(state => state.auth)
  const res = useUseraccountdetailQuery(access_token)

  const [d, setD] = useState()

  const [userdata, setUserdata] = useState({
    email : '',
    firstname : '',
    lastname : ''
  })

  useEffect(()=>{
    if (res.data && res.isSuccess){
      setD(res.data)
    }
  })


  const handlechangedata = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name] : e.target.value
    })
  }

  const [x, setx] = useState(false)
  const [edittxt, setTxt] = useState({
    x1:'Edit',
    x2:'btn btn-success'
  })

  const handleedit = () => {
    if (x==false){
      setx(true)
      setTxt({
        x1:'Close',
        x2:'btn btn-danger'
      })
    } else if(x==true){
      setx(false)
      setTxt({
        x1:'Edit',
        x2:'btn btn-success'
      })
    }
  }




  const [successmsg, setSuccessmsg] = useState('')

  const [updateuser, res_d] = useUpdateuseraccountMutation()


  const handlesubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const actualData = {
      email : data.get('email'),
      first_name : data.get('firstname'),
      last_name : data.get('lastname')
    }

    const aass = await updateuser({actualData, access_token})
    console.log(aass)
    
    if(aass.data){
      setSuccessmsg(aass.data.msg)
      setUserdata({
        email:'',
        firstname:'',
        lastname:''
      })
      setx(false)
      setTxt({
        x1:'Edit',
        x2:'btn btn-success'
      })

      
    }

  
  }



  return (
    <>


<h1>{
  d != null ? <>

  <Form onSubmit={handlesubmit}>

<div className='mx-4 mt-4'>


  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">Email</label>
    <div className="col-sm-9">
      <input type="text" disabled={true} className="form-control-plaintext" style={{color:'gray'}} id="staticEmail" value={d.email}  />
      
      {
        x ? <Form.Control required name='email' type="email" value={userdata.email} onChange={handlechangedata} placeholder="Enter email" /> : <></>
      }
      
    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">FirstName</label>
    <div className="col-sm-9">
      <input type="text" disabled={true} className="form-control-plaintext" style={{color:'gray'}} id="staticEmail" value={d.first_name}  />
      
      {
        x ? <Form.Control required name='firstname' onChange={handlechangedata} type="text" value={userdata.firstname} placeholder="First Name" /> : <></>
      }

    </div>
  </div>
  
  <div className="mb-3 row">
    <label for="staticEmail" className="col-sm-3 col-form-label">LastName</label>
    <div className="col-sm-9">
      <input type="text" disabled={true} className="form-control-plaintext" style={{color:'gray'}} id="staticEmail" value={d.last_name}  />
    
      {
        x ? <Form.Control required name='lastname' onChange={handlechangedata} type="text" value={userdata.lastname} placeholder="Last Name" /> : <></>
      }

      {
        x ? <button type="submit" class="btn btn-primary mt-3">Save</button> : <></>
      }

    </div>
  </div>


  <button type="button" onClick={handleedit} className={edittxt.x2}>{edittxt.x1}</button>

  

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

  </> : <></>
  
  }</h1>


    </>
  )
}

export default Account