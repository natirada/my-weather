import React from 'react';
import classes from './FavoriteCard.css';
import Icon from '../../Icon/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const card = (props) => {
    let style = {
        width: '100px'
    }

    return(

        <div className={classes.Card}>
                <div className={`${classes.Side} ${classes.front}`}>
                    <p className={classes.Date}>{props.city}, {props.country}</p>
                    <Icon propStyle={style} idIcon={props.idIconDay}/>
                    <p>{props.discriptionDay}</p> 
                    <div className={classes.Unit}>{props.minTemperature.toFixed()} /{props.maxTemperature.toFixed()}{'\xB0C'}</div>
                </div>
                <div className={`${classes.Side} ${classes.back}`}>
                <p className={classes.Date}>{props.city}, {props.country}</p>
                    <Icon propStyle={style} idIcon={props.idIconNight}/>
                    <p>{props.discriptionNight}</p> 
                    <div className={classes.Unit}>{props.minTemperature.toFixed()} /{props.maxTemperature.toFixed()}{'\xB0C'}</div>
                    <button className={classes.Button} onClick={props.clickDelete}>
                        {<DeleteIcon />}
                    </button>
                </div>
        </div>
    )
}

export default card;