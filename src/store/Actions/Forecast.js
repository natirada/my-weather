import * as ActionTypes from './actionsTypes';
import axios from '../../axios-weather';


export const onLoading = () => {
    return {
        type: ActionTypes.UPDATE_IS_LOADING
    }
}
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

export const updateForecastFiveDays = (cityInfo) => {
  return dispatch => {
    axios.get(`forecasts/v1/daily/5day/${cityInfo.key}`)
    .then(res =>{ 
       const fiveDailyForecasts = updateDailyForecasts(res.data.DailyForecasts);
       const updateInfoCity = {
           ...cityInfo
       }
       dispatch(onUpdateForecastFiveDays(updateInfoCity,fiveDailyForecasts));
    })
    .catch(err => err)
   }
}


export const initForecastFiveDaysWithGeoLocation = () => {
     return dispatch => { 
        debugger;
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                debugger;
                axios.get(`locations/v1/cities/geoposition/search?q=${latitude},${longitude}`)
                .then(res => {
                   const defualtCity = {
                       key: res.data.Key,
                       city: res.data.EnglishName,
                       country: res.data.Country.EnglishName,
                   };
                   dispatch(updateForecastFiveDays(defualtCity));
                }).catch(err => err);
              });
          } else {
            const defualtCity = {
                city: "Tel Aviv",
                country: "Israel",
                key: "215854",
            };
            dispatch(updateForecastFiveDays(defualtCity));
          }
        }
}
