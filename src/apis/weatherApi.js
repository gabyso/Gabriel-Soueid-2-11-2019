import axios from 'axios';

const API_KEY = '5FvrrmtHopUvBt0UPGalwkCdHTPckDfz';

const ICON_LINK = 'https://developer.accuweather.com/sites/default/files/<id>-s.png';
const DAYS_OF_WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const api = axios.create({
    baseURL: 'http://dataservice.accuweather.com',

});

function getIconLink(id) {
    if(id) {
        const iconId = id < 10 ? `0${id}` : id;

        return ICON_LINK.replace('<id>', iconId)
    }
    return null;
}

export const GetCityFromLocation = async (query) => {
    const response = await api.get('/locations/v1/cities/geoposition/search',{
        params: {
            apikey: API_KEY,
            q: query
        }
    })
    .then(res => {
        return {
            cityName: res.data.LocalizedName,
            cityId: res.data.Key
        }
    })
    .catch(error => {
        return { error };
    });
    
    return response;
};

export const GetCitiesOptions = async query => {
    const response = await api.get('/locations/v1/cities/autocomplete',{
        params: {
            apikey: API_KEY,
            q: query
        }
    })
    .catch(error => {
        return { error };
    });

    if(response.error) {
        return [{ 
            cityName: 'API-Faild Searching'
         }];
    }

    const options = {};

    response.data.forEach(({ LocalizedName, Key }) => {
        options[LocalizedName] = {
            cityName: LocalizedName,
            cityId: Key
        }
    });

    return options;
};

export const GetCurrentWeather = async key => {

    const response = await api.get(`/currentconditions/v1/${key}`,{
        params: { apikey: API_KEY }
    })
    .then(res => {
        const { data } = res;
        return {
            temperature: data[0].Temperature,
            description: data[0].WeatherText,
            icon: getIconLink(data[0].WeatherIcon)
        };
    })
    .catch(err => {
        return { error: 'currentconditions'};
    });
    return response;
};

const GetFiveDaysWeather = async key => {
    const response = await api.get(`/forecasts/v1/daily/5day/${key}`,{
        params: {
            apikey: API_KEY
        }
    })
    .catch(err => {
        return { error: 'forecasts' };
    });

    if(response.error) return response;

    const fiveDaysDetails = response.data.DailyForecasts.map(({ Temperature, Date }) => {
        return {
            temperature: getAverageTemperature(Temperature.Minimum.Value, Temperature.Maximum.Value),
            dayOfWeek: getDay(Date)
        };
    });

    return fiveDaysDetails;
}

export const GetWeatherDetails = async ({cityName, cityId}) => {
    const current = await GetCurrentWeather(cityId);
    const forecast = await GetFiveDaysWeather(cityId);

    if(current.error || forecast.error) {
        return { error: [current.error, forecast.error]};
    }

    return { ...current, forecast };
};

const getDay = date => {
    const dateObj = new Date(date);

    return DAYS_OF_WEEKS[dateObj.getDay()];
}

const getAverageTemperature = (fahrenheit_1, fahrenheit_2) => {
    const avarege = (fahrenheit_1 + fahrenheit_2) / 2;
    const celsius = (avarege - 32) * (5 / 9);

    return Math.round(celsius);
};