import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

const devices = (state= {hash:{}, values:[]}, action)=>{
    switch (action.type) {
        case ActionTypes.CHANGE_STATUS:
            action.data.forEach(item => {
                if(item.mac in state.hash){
                    const ind = state.hash[item.mac];
                    state.values[ind] = Object.assign(state.values[ind], item);
                }else{
                    state.values.push(item);
                    state.hash[item.mac] = state.values.length-1;
                }
            });
            return Object.assign({}, state);
        case ActionTypes.CHANGE_LOCATION:
            action.data.forEach(item => {
                if(item.mac in state.hash){
                    const ind = state.hash[item.mac];
                    state.values[ind] = Object.assign(state.values[ind], item);
                }else{
                    state.values.push(item);
                    state.hash[item.mac] = state.values.length-1;
                }
            });
            return Object.assign({}, state);
        default:
            return state;
    }
}

const currentPage=(state=1, action) => {
    return action.type === ActionTypes.REQUEST_PAGE ? action.page : state
}

const rootReducer = combineReducers({
    currentPage,
    devices
})
export default rootReducer
