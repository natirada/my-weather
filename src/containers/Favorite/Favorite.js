import React,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './Favorite.css';
import * as actions from '../../store/Actions/index';
import CardWeather from '../../components/CardWeather/CardWeather';
import {convertFahrenheitToCelsius} from '../../shared/utilitys';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-weather';


class Favorite extends Component {

    componentDidMount() {
        this.props.fetchFavoriteCites(this.props.favoriteCities);
    }
    componentDidUpdate(prevProps) {   
         if(prevProps.favoriteCities !== this.props.favoriteCities) {
            this.props.fetchFavoriteCites(this.props.favoriteCities);
            
       }
    }
    onClickDelte = (cityKey) => {
        this.props.deleteFromFavorites(cityKey);
    }
    render() {

        let cards = <h3 className={classes.h3}>Please add cities to your favorite</h3>;
        if(this.props.fullFavoritCities.length !== 0) {
             cards = this.props.fullFavoritCities.map(city => {
                return (<CardWeather
                    width="100%"
                    height="20rem"
                    favorite={true} 
                    key={city.key} 
                    minTemperature={this.props.isCelsius ?convertFahrenheitToCelsius(city.Temperature.Minimum.Value): city.Temperature.Minimum.Value}
                    maxTemperature={this.props.isCelsius ?convertFahrenheitToCelsius(city.Temperature.Maximum.Value): city.Temperature.Maximum.Value}
                    char={this.props.isCelsius ? 'C' : 'F'}
                    city={city.city}
                    country={city.country}
                    discriptionDay={city.Day.IconPhrase}
                    idIconDay={city.Day.Icon}
                    discriptionNight={city.Night.IconPhrase}
                    idIconNight={city.Night.Icon}
                    clickDelete={() => this.onClickDelte(city.key)}
                />)
               })
         }    
        return (
            <div className={classes.Favorite}>
                  {cards}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        favoriteCities: state.Favorite.favoriteCities,
        fullFavoritCities: state.Favorite.fullFavoritCities,
        isCelsius: state.Favorite.isCelsius,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFavoriteCites: (cities) => dispatch(actions.fetchFavoriteCities(cities)),
        deleteFromFavorites: (cityKey) => dispatch(actions.removeFavoriteCityFromFavorites(cityKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Favorite, axios));