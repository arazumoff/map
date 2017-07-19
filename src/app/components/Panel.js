import React from 'react';
import { connect } from 'react-redux';
import {getTotalPages} from '../selectors';

import * as ActionTypes from '../actions'
import Info from "./Info";
import {getPage} from "../selectors/index";

class PanelItem extends React.PureComponent{

    render(){
        const {device} = this.props;
        return (
            <div>
                <div>mac:{device.mac}</div>
                <div>isOnline: {JSON.stringify(device.status.isOnline)}</div>
            </div>
        )
    }
}

class Panel extends React.Component{

    nextPage=()=>{
        const {dispatch, currentPage, pages} = this.props;
        if(currentPage+1 < pages){
            dispatch({type: ActionTypes.REQUEST_PAGE, page:currentPage+1})
        }
    }

    prevPage=()=>{
        const {dispatch, currentPage} = this.props;
        if(currentPage - 1 >= 1){
            dispatch({type: ActionTypes.REQUEST_PAGE, page:currentPage-1})
        }
    }

    render() {
        const {devices, currentPage, pages} = this.props;

        const html = devices.map((device) =>
                <PanelItem key={device.mac} device={device}/>
        );
        return (<div className="col-sm-3">
            <Info/>
            <hr/>
            <div>{html}</div>
            <hr/>
            <div>current page {currentPage}</div>
            <div>total pages {pages}</div>
            <div>
                <a onClick={(e)=>this.prevPage()}>пред</a> | <a onClick={(e)=>this.nextPage()}>след</a>
            </div>
        </div>)
    }
}

const makeMapStateToProps = () => {
    const mapStateToProps = (state, props) => {
        return {
            devices: getPage(state),
            pages: getTotalPages(state),
            currentPage: state.currentPage
        }
    };
    return mapStateToProps;
}
export default connect(makeMapStateToProps)(Panel)
