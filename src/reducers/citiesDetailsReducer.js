export default (state = null, action) => {
    if(action.type === 'FETCH_CITY_DETAILS') {
        return action.payload;
    }
    else if(action.type === 'FETCH_FAVORITE_CITY') {
        return { ...state, isFavorite: action.payload }
    }
    else return state;
}