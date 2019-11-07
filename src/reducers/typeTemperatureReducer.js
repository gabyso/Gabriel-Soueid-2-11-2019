export default (state = false, action) => {
    if(action.type === 'FETCH_TEMPERATURE_TYPE') {
        return action.payload;
    }
    return state;
}