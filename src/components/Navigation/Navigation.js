import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import classes from './Navigation.css';
const navigation = (props) => {

    return(
     
        <Navbar className="justify-content-between" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home"><span className={classes.Brand}>My Weather</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav >
                 <Nav.Link as={Link} to="/">
                        <span className={classes.NavgationItems} >Home</span>
                 </Nav.Link>

                <Nav.Link as={Link} to="/favorite" eventKey={2}>                  
                    <span className={classes.NavgationItems}>Favorite</span>
                </Nav.Link>   

            </Nav>
            </Navbar.Collapse>
        </Navbar>   
    )
}


export default navigation;