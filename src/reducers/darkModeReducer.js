export default (state = false, action) => {
    if(action.type === 'FETCH_DARK_MODE') {
        return action.payload;
    }
    return state; 
};