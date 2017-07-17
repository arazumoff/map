import { createSelector } from 'reselect';

const getItems = (state) => state.status;

const getItemsOnline = createSelector(
    [getItems],
    items => items.filter(item=> item.status.isOnline)
)

const getItemsOffline = createSelector(
    [getItems],
    items => items.filter(item=> !item.status.isOnline)
)

export const getCountOffline = createSelector(
    [getItemsOffline],
    (items)=> items.reduce((acc, i) => acc+1, 0)
)

export const getCountOnline = createSelector(
    [getItemsOnline],
    (items)=> items.reduce((acc, i) => acc+1, 0)
)