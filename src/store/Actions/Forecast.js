import * as ActionTypes from './actionsTypes';
import axios from 'axios';

const token = 'm9lAGyPN4SxWZAFBBSghB43DxuBB1VDj';




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
    axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityInfo.key}?apikey=${token}`)
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