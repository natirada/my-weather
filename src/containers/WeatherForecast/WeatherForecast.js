import React, {useEffect, useState} from 'react';
import CardWeather from '../../components/CardWeather/CardWeather';
import classes from './WeatherForecast.css';
import Like from '../../components/Like/Like';
import AutoCompleteBoxInput from '../AutoCompleteBoxInput/AutoCompleteBoxInput';
import Logo from '../../components/Logo/Logo';
import {convertFahrenheitToCelsius} from '../../shared/utilitys';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-weather';
import CustomizedSnackbars from '../../components/UI/Snackbar/Snackbar';
import Spinner from '../../components/UI/Spinner/Spinner';

const WeatherForecast = props => {
    const [snackbar, setsnackbar] = useState({variant: '',message: ''});
    const [clickLike, setclickLike] = useState(false);
    
    useEffect(() => {
        props.onInitForecastFiveDaysWithGeoLocation();
        props.onLoading();
    },[])

    const onClickSearch = (optionCitySelected) => {
        props.onupdateForecastFiveDays(optionCitySelected );
    }

    const updateFavoriteCities = (stateLike) => {
        setclickLike(true);
        if(stateLike) {
            props.addToFavorite(props.infoCity);
            setsnackbar({variant: 'success', message: 'add to favorites'});
        }else {
            props.removeFavorite(props.infoCity.key);
            setsnackbar({variant: 'error', message: 'remove from favorites'});
        }
    }

   const isLike = () => {
           return props.favoriteCities.some(city => city.key === props.infoCity.key);
    }

        let cards = props.FiveDailyForecasts.map(city => {
            return <CardWeather 
            width="88%"
            height="12rem"
            favorite={false}
            key={city.EpochDate}
            day={city.Date.getDay()} 
            minTemperature={props.isCelsius ?convertFahrenheitToCelsius(city.Temperature.Minimum.Value): city.Temperature.Minimum.Value}
            maxTemperature={props.isCelsius ?convertFahrenheitToCelsius(city.Temperature.Maximum.Value): city.Temperature.Maximum.Value}
            char={props.isCelsius ? 'C' : 'F'}
            city={city.city}
            country={city.country}
            discriptionDay={city.Day.IconPhrase}
            idIconDay={city.Day.Icon}
            discriptionNight={city.Night.IconPhrase}
            idIconNight={city.Night.Icon}
            />
        });
    
        
        
        return(        
          <React.Fragment>
                {clickLike ? <CustomizedSnackbars variant={snackbar.variant} message={snackbar.message} open={clickLike} handleClose={() => setclickLike(false)}/>: null}  
                <AutoCompleteBoxInput clickOption={onClickSearch} />
               { props.isLoading ?
                <div className={classes.spinner}>
                <Spinner/>
                </div> : (<div className={classes.WeatherForecast}>
                    <Logo className={classes.Head}/>
                    <p className={classes.CityName}>{props.infoCity.city},{props.infoCity.country}</p>
                    <span className={classes.Like}> 
                        <Like isLike={isLike()} clickLike={updateFavoriteCities}/>
                    </span>
                    <div className={classes.Cards}> 
                        {cards}
                    </div>
                </div>) 
                }
                    
          </React.Fragment>
        )
    }


const mapDispatchToProps = dispatch => {
    return {
        addToFavorite: (cityInfo) => dispatch(actions.addFavoriteCity(cityInfo)),
        removeFavorite: (key) => dispatch(actions.removeFavoriteCity(key)),
        onupdateForecastFiveDays: (cityInfo, isLike) => dispatch(actions.updateForecastFiveDays(cityInfo, isLike)),
        updatIsLike: (isLike) => dispatch(actions.updatIsLike(isLike)),
        onInitForecastFiveDaysWithGeoLocation: () => dispatch(actions.initForecastFiveDaysWithGeoLocation()),
        onLoading: () => dispatch(actions.onLoading())

    }
}

const mapStateToProps = state => {
    return {
        FiveDailyForecasts: state.Forecast.FiveDailyForecasts,
        infoCity: state.Forecast.infoCity,
        favoriteCities: state.Favorite.favoriteCities,
        isCelsius: state.Favorite.isCelsius,
        isLoading: state.Forecast.isLoading,

    }
}

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(WeatherForecast, axios));

