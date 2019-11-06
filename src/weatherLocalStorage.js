const FAVORITES_CITIES = 'favoritesCitiesWeather';


export const GetFavorites = () => {
    const favoritesCitiesStorage = localStorage.getItem(FAVORITES_CITIES);
    let favoritesCities;

    if(!favoritesCitiesStorage) {
        favoritesCities = {};
        localStorage.setItem(FAVORITES_CITIES, JSON.stringify(favoritesCities));
    }
    else favoritesCities = JSON.parse(favoritesCitiesStorage);

    return favoritesCities;
}

export const AddToFavorites = city => {
    let favoritesCities = GetFavorites();

    favoritesCities[city.cityName] = city.cityId;

    localStorage.setItem(FAVORITES_CITIES, JSON.stringify(favoritesCities));
}

export const DeleteFromFavorites = city => {
    let favoritesCities = GetFavorites();

    delete favoritesCities[city.cityName];

    localStorage.setItem(FAVORITES_CITIES, JSON.stringify(favoritesCities));
}

