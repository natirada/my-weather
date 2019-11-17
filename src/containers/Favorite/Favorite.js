import React,{Component} from 'react';
import {connect} from 'react-redux';
import classes from './Favorite.css';
import * as actions from '../../store/Actions/index';
import Card from '../../components/Cards/FavoriteCard/FavoriteCard';
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
                return (<Card 
                    key={city.key} 
                    minTemperature={convertFahrenheitToCelsius(city.Temperature.Minimum.Value)}
                    maxTemperature={convertFahrenheitToCelsius(city.Temperature.Maximum.Value)}
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

const stateToProps = state => {
    return {
        favoriteCities: state.Favorite.favoriteCities,
        fullFavoritCities: state.Favorite.fullFavoritCities
    }
}

const dispatchToProps = dispatch => {
    return {
        fetchFavoriteCites: (cities) => dispatch(actions.fetchFavoriteCities(cities)),
        deleteFromFavorites: (cityKey) => dispatch(actions.removeFavoriteCityFromFavorites(cityKey))
    }
}

export default connect(stateToProps, dispatchToProps)(withErrorHandler(Favorite, axios));