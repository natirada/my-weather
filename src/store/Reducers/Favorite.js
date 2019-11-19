import * as ActionTypes from '../Actions/actionsTypes';

const intialState = {
    favoriteCities: [],
    fullFavoritCities: [],
    isLight: true,
    isCelsius: true
}


const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITE_CITY:{
            const index = state.favoriteCities.findIndex( el => el.key === action.infoCity.key);
            if(index !== -1) {
                return state;
            }
            const updateState = [...state.favoriteCities,{...action.infoCity}];
            if(updateState.length > 5) {
                return {
                    ...state,
                    favoriteCities: updateState.slice(1,6)
                }
            }else {
                return  {
                    ...state,
                    favoriteCities: [...updateState]
                };
            }
        }
        case ActionTypes.REMOVE_FAVORITE_CITY: {
           const afterCityRemone = state.favoriteCities.filter(el => el.key !== action.cityKey); 
           return {
                ...state,
                favoriteCities: [...afterCityRemone]
            }
        }
        case ActionTypes.FETCH_FAVORITE_CITY:
            return {
                      ...state,
                      fullFavoritCities: [...action.favortieCities]
                    }
        case ActionTypes.INIT_FAVORITES_CITIES: 
            return {
                ...state,
                favoriteCities: [...action.favortieCities]
            }
        case ActionTypes.REMOVE_FAVORITE_CITY_FROM_FAVORITES:
                const afterCityRemone = state.favoriteCities.filter(el => el.key !== action.cityKey);
                const afterFullCityRemone = state.fullFavoritCities.filter(el => el.key !== action.cityKey);
                return {
                    favoriteCities: [...afterCityRemone],
                    fullFavoritCities: [...afterFullCityRemone]
                }
        case ActionTypes.UPDATE_SETTINGS:         
             return {
                 ...state,
                 isLight: action.isLight,
                 isCelsius: action.isCelsius
             }   
        default:
            return state;
    }
}


export default reducer;