import { combineReducers } from 'redux';
import citiesDetailsReducer from './citiesDetailsReducer';
import selectedCityReducer from './selectedCityReducer';
import darkModeReducer from './darkModeReducer';

export default combineReducers({
    citiesDetails: citiesDetailsReducer,
    selectedCity: selectedCityReducer,
    darkMode: darkModeReducer
});