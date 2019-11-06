import { combineReducers } from 'redux';
import citiesDetailsReducer from './citiesDetailsReducer';
import selectedCityReducer from './selectedCityReducer';

export default combineReducers({
    citiesDetails: citiesDetailsReducer,
    selectedCity: selectedCityReducer
});