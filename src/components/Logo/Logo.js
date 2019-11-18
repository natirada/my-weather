import React from 'react';
import classes from './Logo.css';
import IconSVG from '../../assets/SVG/cloudy.svg';
const logo = (props) => {
    return(
        <img src={IconSVG} className={classes.logo} alt="add to Favorite"/>
    )
}

export default logo;