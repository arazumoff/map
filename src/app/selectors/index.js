import { createSelector } from 'reselect';
import {PER_PAGE} from '../config';

const getItems = (state) => {
    return state.devices.values.filter(item=> item.status !== undefined);
}

export const getCountWithoutStatus = (state) => {
    return state.devices.values.filter(item=> item.status === undefined).length;
}

export const getTotalCount = (state)=>{
    return state.devices.values.length
}

const getCurrentPage = (state) => state.currentPage

 export const getItemsOnline = createSelector(
    [getItems],
    items => items.filter(item => item.status.isOnline)
)

const getItemsOffline = createSelector(
    [getItems],
    items => items.filter(item => !item.status.isOnline)
)

export const getCountOffline = createSelector(
    [getItemsOffline],
    (items)=> items.reduce((acc, i) => acc+1, 0)
)

export const getCountOnline = createSelector(
    [getItemsOnline],
    (items)=> items.reduce((acc, i) => acc+1, 0)
)

export const getTotalPages = createSelector(
    [getCountOnline],
    (count)=> Math.ceil(count/PER_PAGE)
)

export const getPage = createSelector(
    [getItems, getCurrentPage],
    (items, page) => {
        return items.slice((page-1) * PER_PAGE, (page-1) * PER_PAGE + PER_PAGE);
    }
)
