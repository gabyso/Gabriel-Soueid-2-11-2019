import { GetWeatherDetails } from '../apis/weatherApi';
import { GetFavorites, AddToFavorites, DeleteFromFavorites } from '../weatherLocalStorage';

export const fetchCityDetails = city => async dispatch => {
    const favorites = GetFavorites();
    const isFavorite = favorites[city.cityName] ? true : false;
    const response = await GetWeatherDetails(city);

    const data = { ...response, cityId: city.cityId, cityName: city.cityName, isFavorite };

    dispatch({ type: 'FETCH_CITY_DETAILS', payload: data });
}

export const fetchSelectedCity = city => {
    return { type: 'FETCH_SELECTED_CITY', payload: city };
}

export const fetchToggleFavorites = city => {
    if(city.isFavorite) DeleteFromFavorites(city);
    else AddToFavorites(city);

    return { type: 'FETCH_FAVORITE_CITY', payload: !city.isFavorite };
}

export const fetchDarkMode = mode => {
    return { type: 'FETCH_DARK_MODE', payload: mode };
}

export const fetchTemperature = type => {
    return { type: 'FETCH_TEMPERATURE_TYPE', payload: type };
}