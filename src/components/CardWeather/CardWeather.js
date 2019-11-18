import React from 'react';
import classes from './CardWeather.css';
import Icon from '../Icon/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import {Weekdays} from '../../shared/utilitys';

const card = (props) => {
    let style = {
        width: '100px'
    }
    const styleWidthHeight = {
        height: props.height,
        width: props.width
    }
    let headerCard = props.favorite ? (<p className={classes.Date}>{props.city}, {props.country}</p>) : (<p>{Weekdays[props.day]}</p>);
    return(
        <div className={classes.Card} style={{width: '14rem'}} >
                <div className={`${classes.Side} ${classes.front}`} style={styleWidthHeight}>
                   {headerCard}
                    <Icon propStyle={style} idIcon={props.idIconDay}/>
                    <p>{props.discriptionDay}</p> 
                    <div className={classes.Unit}>{props.minTemperature.toFixed()} /{props.maxTemperature.toFixed()}{'\xB0C'}</div>
                </div>
                <div className={`${classes.Side} ${classes.back}`} style={styleWidthHeight}>
                   {headerCard}
                     <Icon propStyle={style} idIcon={props.idIconNight}/>
                    <p>{props.discriptionNight}</p> 
                    <div className={classes.Unit}>{props.minTemperature.toFixed()} /{props.maxTemperature.toFixed()}{'\xB0C'}</div>
                   {props.favorite ? (<button className={classes.Button} onClick={props.clickDelete}>
                        {<DeleteIcon />}
                    </button>): null}
                </div>
        </div>
    )
}

export default card;