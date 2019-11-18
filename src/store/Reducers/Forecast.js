import * as ActionTypes from '../Actions/actionsTypes';

const intialState = {
    infoCity: {
        city: "",
        country: "",
        key: ""
    },
    FiveDailyForecasts : []
}


const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FORECAST_FIVE_DAYS: 
        return {
            infoCity: {
                ...action.infoCity},
            FiveDailyForecasts: [...action.fiveDailyForecasts]
        }
        case ActionTypes.INITAL_DEFUALT_CITY_WITH_GEOLOCATION:
            return {
                ...state,
                infoCity: {
                    ...action.defualtCity
                }
            }    
        default:
            return state;
    }
}


export default reducer;