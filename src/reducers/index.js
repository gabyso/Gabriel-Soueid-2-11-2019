import { combineReducers } from 'redux';
import citiesDetails from './citiesDetailsReducer';
import selectedCity from './selectedCityReducer';
import darkMode from './darkModeReducer';
import typeTemperature from './typeTemperatureReducer';

export default combineReducers({
    citiesDetails,
    selectedCity,
    darkMode,
    typeTemperature
});