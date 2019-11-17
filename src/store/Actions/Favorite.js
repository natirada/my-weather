
import * as ActionTypes from './actionsTypes';
import axios from '../../axios-weather';

const token = 'Ri5y2eX4Y3kO65mtvxhPDAX7AsZ1tJb1';


const addToLocalSoreage = (infoCity) => {
    const city = JSON.stringify(infoCity)
    localStorage.setItem(`City_${infoCity.key}`, city);
}


export const addFavoriteCity = (infoCity) =>{
    addToLocalSoreage(infoCity);
    return {
        type: ActionTypes.ADD_FAVORITE_CITY,
        infoCity: infoCity
    }
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(`City_${key}`)
}

export const removeFavoriteCity = (cityKey) => {
    removeFromLocalStorage(cityKey);
    return {
        type: ActionTypes.REMOVE_FAVORITE_CITY,
        cityKey: cityKey
    }
}

const onfetchFavoriteCities = (favortieCities) => {
    return {
        type: ActionTypes.FETCH_FAVORITE_CITY,
        favortieCities: favortieCities

    }
}

const getAllCitiesFromLocalStorage = () => {
    if(localStorage.length === 0) {
        return [];
    }
    const cities = [];
    for(let keyCity in localStorage) {
       const cityStr = localStorage.getItem(keyCity);
       if(cityStr !== null) {
        const city = JSON.parse(cityStr);
        cities.push(city);
       }
    }
    
    return cities;
}
export const fetchFavoriteCities = (favortieCities) => {
    return dispatch => {
        const promises = [];
        const updateFavortieCities = [];
        favortieCities.forEach((city) => {
            promises.push(new Promise(resolve => {
                axios.get(`forecasts/v1/daily/1day/${city.key}?apikey=${token}`)
                .then(res => {
                    let updateCity = {
                        ...city,
                        ...res.data.DailyForecasts[0],
                        Date: new Date(res.data.DailyForecasts[0].Date)
                    }
                    updateFavortieCities.push(updateCity);
                    resolve();
                })
            }))
        });

        Promise.all(promises).then( () => {
            dispatch(onfetchFavoriteCities(updateFavortieCities));
        })
    }
}


const onInitFavoritesCities = (favortieCities) => {
    return {
        type: ActionTypes.INIT_FAVORITES_CITIES,
        favortieCities: favortieCities
    }
}

export const initFavoritesCities = () => {
        const cities = getAllCitiesFromLocalStorage();
        return onInitFavoritesCities(cities);

}

export const onRemoveFavoriteCityFromFavorites = (cityKey) => {
    removeFromLocalStorage(cityKey);
    return {
        type: ActionTypes.REMOVE_FAVORITE_CITY_FROM_FAVORITES,
        cityKey: cityKey
    }
}


export const removeFavoriteCityFromFavorites = (cityKey) => {
    return dispatch => {
        dispatch(onRemoveFavoriteCityFromFavorites(cityKey));
    }
}