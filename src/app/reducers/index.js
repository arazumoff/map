import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'
import {unionBy, rest} from 'lodash';
import {PER_PAGE} from '../config';


const status=(state = [], action)=>{
    switch (action.type) {
        case ActionTypes.CHANGE_STATUS:
            return unionBy(state, action.data, 'mac');
        case ActionTypes.GET_PAGE:
            return
        default:
            return state
    }
}

const pages=(state=0, action)=>{
    switch(action.type){
        case ActionTypes.GET_PAGES:
            return Math.ceil(action.data.length/PER_PAGE);
        default:
            return state;
    }
}

const currentPage=(state=1, action) => {
    return action.type === ActionTypes.REQUEST_PAGE ? action.payload.page : state
}

const location=(state = [], action)=>{
    switch (action.type) {
        case ActionTypes.CHANGE_LOCATION:
            let a = unionBy(state, action.data, 'mac');
            a.shift();
            return a
        case ActionTypes.GET_LOCATION:
            return
        default:
            return state
    }
}

const rootReducer = combineReducers({
    status,
    pages,
    currentPage,
    location
})
export default rootReducer
