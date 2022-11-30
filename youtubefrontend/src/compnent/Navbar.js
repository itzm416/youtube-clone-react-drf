import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import { getToken, removeToken, removeprofilepic } from '../services/LocalStorageService';
import { useDispatch, useSelector } from 'react-redux';
import { unSetUserToken } from '../features/usertoken/userSlice';
import { unSetToken } from '../features/usertoken/userToken';
import { getprofilepic } from '../services/LocalStorageService'
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function BrandExample() {

  const dispatch = useDispatch()
  const x = useSelector(state => state.auth)

  const handlleclick = () => {
    removeToken()
    removeprofilepic()
    dispatch( unSetUserToken({access_token : null}) )
    dispatch( unSetToken({refresh_token : null}) )
  }
               

  const userpic = getprofilepic()
  console.log(userpic.pic)

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  return (
    <>
    
    
      <Navbar style={{background:'#212121'}}>
        <div className='container-fluid'>
          
        <NavLink to="/" style={{paddingLeft: 13, textDecoration: 'none', color:'white'}}>

            <svg xmlns="http://www.w3.org/2000/svg" style={{ color:'red' }} width="50" height="30" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
            </svg>
                  <span className='brandname'>
                    YouTube
                  </span>    
        </NavLink>

          <Nav className="mx-auto">

            <Form>
                <Form.Control
                style={{background:'rgb(24 24 24)', color:'white'}}
                type="search"
                placeholder="Search"
                className="px-5 rounded-pill border-secondary"
                aria-label="Search"
                />
            </Form>
          </Nav>
          
          <Nav className="d-flex px-0">
           


        


           
           { x.access_token ? <NavLink to="/uploadvideos" className='mt-2'>
                <svg style={{color:'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill alert-light" viewBox="0 0 16 16">
                    <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
                </svg>
            </NavLink> : 
           


<>



{['bottom'].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">Unauthorized</Popover.Header>
              <Popover.Body>

                Want to upload video to this channel? Sign in to upload video to this channel

              </Popover.Body>
            </Popover>
          }
        >


          <NavLink onClick={toggleShowA} className='mt-2'>
                <svg style={{color:'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill alert-light" viewBox="0 0 16 16">
                    <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
                </svg>
          </NavLink>
       
       
        </OverlayTrigger>
      ))}






          

           
           


           
</>
           
           
           }





           







            
            <div>
                {['start'].map(
                (direction) => (
                    <DropdownButton
                    
                    as={ButtonGroup}
                    key={direction}
                    drop={direction}
                    variant='dark'
                    menuVariant="dark"
                    title={ x.access_token ? <img src={`http://127.0.0.1:8000/.${userpic.pic}`} alt="mdo" width="30" height="30" className="rounded-circle" /> : <img src='https://www.vhv.rs/dpng/d/436-4363443_view-user-icon-png-font-awesome-user-circle.png' alt="mdo" width="30" height="30" className="rounded-circle" />}
                    >

                  {
                    x.access_token  ? <>
                     <Dropdown.Item onClick={() => handlleclick()} >logout</Dropdown.Item> 
                    
                    <Dropdown.Item >
                      <NavLink to="/userprofile" style={{paddingRight:'80px', textDecoration: 'none', color:'white'}}>
                        profile
                      </NavLink>
                    </Dropdown.Item>

                    </> : <>
                    <Dropdown.Item >
                      <NavLink to="/login" style={{paddingRight:'80px', textDecoration: 'none', color:'white'}}>
                        login
                      </NavLink>
                    </Dropdown.Item>

                    <Dropdown.Item >
                      <NavLink to="/signup" style={{paddingRight:'80px', textDecoration: 'none', color:'white'}}>
                        signup
                      </NavLink>
                    </Dropdown.Item>
                </>  

                  }

                    </DropdownButton>
                )
                )}
            </div>

          </Nav>

        </div>
      </Navbar>

      
    </>
  );
}

export default BrandExample;