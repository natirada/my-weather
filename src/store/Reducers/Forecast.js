import * as ActionTypes from '../Actions/actionsTypes';

const intialState = {
    infoCity: {
        city: "Tel Aviv",
        country: "Israel",
        key: "215854",
        isLike: false
    },
    FiveDailyForecasts : []
}


const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FORECAST_FIVE_DAYS: 
        return {
            infoCity: {...action.infoCity},
            FiveDailyForecasts: [...action.fiveDailyForecasts]
        }
        case ActionTypes.UPDATE_IS_LIKE:
            return {
                ...state,
                infoCity: {
                    ...state.infoCity,
                    isLike: action.isLike
                }
            }
        default:
            return state;
    }
}


export default reducer;