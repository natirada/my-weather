import React, {useEffect} from 'react';
import Card from '../../components/Cards/ForecastCard/ForecastCard';
import classes from './WeatherForecast.css';
import Like from '../../components/Like/Like';
import AutoCompleteBoxInput from '../AutoCompleteBoxInput/AutoCompleteBoxInput';
import Logo from '../../components/Logo/Logo';
import {convertFahrenheitToCelsius} from '../../shared/utilitys';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-weather';

const WeatherForecast = props => {

    useEffect(() => {
        props.onInitForecastFiveDaysWithGeoLocation();
        props.onupdateForecastFiveDays(props.infoCity, isLike(props.infoCity.key));
    }, [])

    // componentDidMount() {
    //     props.onupdateForecastFiveDays(props.infoCity, isLike(props.infoCity.key));
    // }


    const onClickSearch = (optionCitySelected) => {
        props.onupdateForecastFiveDays(optionCitySelected ,isLike(optionCitySelected.key) );
    }

    const updateFavoriteCities = (stateLike) => {
       props.updatIsLike(stateLike);
        if(stateLike) {
            props.addToFavorite(props.infoCity);
        }else {
            props.removeFavorite(props.infoCity.key)
        }
    }

    const  isLike = (key) => {
        let flag = false;
        props.favoriteCities.forEach(el => {
            if(el.key === key) {
                flag = true;
                return;
            }
        })

        return flag;
    }
 
        let cards = props.FiveDailyForecasts.map(forecasts => {
            return <Card 
                        key={forecasts.EpochDate} 
                        minTemperature={convertFahrenheitToCelsius(forecasts.Temperature.Minimum.Value)}
                        maxTemperature={convertFahrenheitToCelsius(forecasts.Temperature.Maximum.Value)}
                        day={forecasts.Date.getDay()}
                        idIcon={forecasts.Day.Icon}
                        />
        } )
        return(
          <React.Fragment>
            <AutoCompleteBoxInput clickOption={onClickSearch} />
            <div className={classes.WeatherForecast}>
                <Logo className={classes.Head}/>
                <p className={classes.CityName}>{props.infoCity.city},{props.infoCity.country}</p>
                <span className={classes.Like}> 
                     <Like isLike={props.infoCity.isLike} clickLike={updateFavoriteCities}/>
                </span>
                <div className={classes.Cards}> 
                    {cards}
                </div>
            </div>  
          </React.Fragment>
        )
    }


const DispatchToProps = dispatch => {
    return {
        addToFavorite: (cityInfo) => dispatch(actions.addFavoriteCity(cityInfo)),
        removeFavorite: (key) => dispatch(actions.removeFavoriteCity(key)),
        onupdateForecastFiveDays: (cityInfo, isLike) => dispatch(actions.updateForecastFiveDays(cityInfo, isLike)),
        updatIsLike: (isLike) => dispatch(actions.updatIsLike(isLike)),
        onInitForecastFiveDaysWithGeoLocation: () => dispatch(actions.initForecastFiveDaysWithGeoLocation())
    }
}

const stateToProps = state => {
    return {
        FiveDailyForecasts: state.Forecast.FiveDailyForecasts,
        infoCity: state.Forecast.infoCity,
        favoriteCities: state.Favorite.favoriteCities
    }
}

export default connect(stateToProps , DispatchToProps)(withErrorHandler(WeatherForecast, axios));

