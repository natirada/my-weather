import React, {Component} from 'react';
import Card from '../../components/Cards/ForecastCard/ForecastCard';
import classes from './WeatherForecast.css';
import Like from '../../components/Like/Like';
import AutoCompleteBoxInput from '../AutoCompleteBoxInput/AutoCompleteBoxInput';
import Logo from '../../components/Logo/Logo';
import {convertFahrenheitToCelsius} from '../../shared/utilitys';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';


class WeatherForecast extends Component {

    componentDidMount() {
        this.props.onupdateForecastFiveDays(this.props.infoCity, this.isLike(this.props.infoCity.key));
    }


    onClickSearch = (optionCitySelected) => {
        this.props.onupdateForecastFiveDays(optionCitySelected ,this.isLike(optionCitySelected.key) );
    }

    updateFavoriteCities = (stateLike) => {
       this.props.updatIsLike(stateLike);
        if(stateLike) {
            this.props.addToFavorite(this.props.infoCity);
        }else {
            this.props.removeFavorite(this.props.infoCity.key)
        }
    }

    isLike = (key) => {
        let flag = false;
        this.props.favoriteCities.forEach(el => {
            if(el.key === key) {
                flag = true;
                return;
            }
        })

        return flag;
    }
    render() {
    
        console.log(this.state);
        
        let cards = this.props.FiveDailyForecasts.map(forecasts => {
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
            <AutoCompleteBoxInput clickOption={this.onClickSearch} />
            <div className={classes.WeatherForecast}>
                <Logo className={classes.Head}/>
                <p className={classes.CityName}>{this.props.infoCity.city}, {this.props.infoCity.country}</p>
                <span className={classes.Like}> 
                     <Like isLike={this.props.infoCity.isLike} clickLike={this.updateFavoriteCities}/>
                </span>
                <div className={classes.Cards}> 
                    {cards}
                </div>
            </div>  
          </React.Fragment>
        )
    }
}

const DispatchToProps = dispatch => {
    return {
        addToFavorite: (cityInfo) => dispatch(actions.addFavoriteCity(cityInfo)),
        removeFavorite: (key) => dispatch(actions.removeFavoriteCity(key)),
        onupdateForecastFiveDays: (cityInfo, isLike) => dispatch(actions.updateForecastFiveDays(cityInfo, isLike)),
        updatIsLike: (isLike) => dispatch(actions.updatIsLike(isLike))
    }
}

const stateToProps = state => {
    return {
        FiveDailyForecasts: state.Forecast.FiveDailyForecasts,
        infoCity: state.Forecast.infoCity,
        favoriteCities: state.Favorite.favoriteCities
    }
}

export default connect(stateToProps , DispatchToProps)(WeatherForecast);

