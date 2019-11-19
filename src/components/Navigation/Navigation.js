import React,{Component} from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import classes from './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faSlidersH } from '@fortawesome/free-solid-svg-icons';


class Navigation extends Component {
    render() {
        return(
            <Navbar className="justify-content-between" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home"><span className={classes.Brand}>My Weather</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">
                                <span className={classes.NavgationItems} > <FontAwesomeIcon icon={faHome}/> Home</span>
                        </Nav.Link>
    
                        <Nav.Link as={Link} to="/favorite" >                  
                            <span className={classes.NavgationItems}> <FontAwesomeIcon icon={faHeart}/> Favorites</span>
                        </Nav.Link>   
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/settings" style={{color: 'blue'}}>
                                    <span className={classes.NavgationItems} > <FontAwesomeIcon icon={faSlidersH}/> Settings</span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
    
}


export default Navigation;