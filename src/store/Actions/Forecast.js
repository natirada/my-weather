import * as ActionTypes from './actionsTypes';
import axios from '../../axios-weather';

const token = 'Ri5y2eX4Y3kO65mtvxhPDAX7AsZ1tJb1';




const onUpdateForecastFiveDays = (infoCity, fiveDailyForecasts) => {
    return {
        type: ActionTypes.UPDATE_FORECAST_FIVE_DAYS,
        infoCity: infoCity,
        fiveDailyForecasts: fiveDailyForecasts
    }
}


const updateDailyForecasts = (dailyForecasts) => {
    let FiveDailyForecasts = [];
    for(let key in dailyForecasts){
        FiveDailyForecasts.push({...dailyForecasts[key], Date: new Date(dailyForecasts[key].Date)});
    }
    return FiveDailyForecasts;
}

export const updateForecastFiveDays = (cityInfo ,isLike) => {
  return dispatch => {
    axios.get(`forecasts/v1/daily/5day/${cityInfo.key}?apikey=${token}`)
    .then(res =>{ 
       const fiveDailyForecasts = updateDailyForecasts(res.data.DailyForecasts);
       const updateInfoCity = {
           ...cityInfo,
           isLike: isLike
       }
       dispatch(onUpdateForecastFiveDays(updateInfoCity,fiveDailyForecasts));
    })
    .catch(err => console.log(err))
   }
}


export const updatIsLike = (isLike) => {
    return  {
        type: ActionTypes.UPDATE_IS_LIKE,
        isLike: isLike
    }
}


const initDefualtCity = (cityInfo) => {
    return {
        type: ActionTypes.INITAL_DEFUALT_CITY_WITH_GEOLOCATION,
        defualtCity :cityInfo
    }
}

export const initForecastFiveDaysWithGeoLocation = () => {
    return dispatch => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                axios.get(`locations/v1/cities/geoposition/search?apikey=${token}&q=${latitude},${longitude}`)
                .then(res => {
                   const defualtCity = {
                       key: res.data.Key,
                       city: res.data.EnglishName,
                       country: res.data.Country.EnglishName,
                       isLike: false
                   };
                  dispatch(initDefualtCity(defualtCity));
                });
              });
          } else {
            const defualtCity = {
                city: "Tel Aviv",
                country: "Israel",
                key: "215854",
                isLike: false
            };
            dispatch(initDefualtCity(defualtCity));
          }
    }
}