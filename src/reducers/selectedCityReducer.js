export default (state = null, action) => {
    if(action.type === 'FETCH_SELECTED_CITY') {
        return action.payload;
    }
    return state; 
};