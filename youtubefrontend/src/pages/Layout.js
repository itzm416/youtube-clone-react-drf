import React from 'react'
import Navbar from '../compnent/Navbar'
import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/ListGroup';

const Layout = () => {
  return (
    <>

        <Navbar />


<div className='container-fluid' style={{color:'white'}}>
   
     <Row>
        
        <Col md={3} lg={2} className='px-0'>
          <ListGroup className='listnew'>
          
            <ListGroup.Item style={{background:'#212121', color:'white', minHeight:'100vh'}}>

            <ListGroup.Item style={{background:'#212121', color:'white', fontSize:'16px'}}>Home</ListGroup.Item>
            <ListGroup.Item style={{background:'#212121', color:'white', fontSize:'16px'}}>Liked Videos</ListGroup.Item>
            <ListGroup.Item style={{background:'#212121', color:'white', fontSize:'16px'}}>History</ListGroup.Item>
            <ListGroup.Item style={{background:'#212121', color:'white', fontSize:'16px'}}>Music</ListGroup.Item>
            <ListGroup.Item style={{background:'#212121', color:'white', fontSize:'16px'}}>Watch Videos</ListGroup.Item>
            
            </ListGroup.Item>
           
          </ListGroup>
        </Col>
        
        <Col md={9} lg={10}>
          <Outlet />
        </Col>
      
      </Row>
    
</div>


    </>
  )
}

export default Layout