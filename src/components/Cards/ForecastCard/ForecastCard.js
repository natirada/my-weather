import React from 'react';
import classes from './ForecastCard.css';
import Icon from '../../Icon/Icon';
import {Weekdays} from '../../../shared/utilitys';

const card = (props) => {
    let style = {
        width: '100px'
    }
    
    return(
        <div className={classes.Card}>
            <p className={classes.Date}>{Weekdays[props.day]}</p>
             <Icon propStyle={style} idIcon={props.idIcon}/> 
            <div className={classes.Unit}>{props.minTemperature.toFixed()} /{props.maxTemperature.toFixed()}{'\xB0C'}</div>
        </div>
    )
}

export default card;