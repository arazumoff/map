import React from 'react';
import { connect } from 'react-redux';
import {getCountOffline, getCountOnline, getCountWithoutStatus, getTotalCount} from "../selectors/index";


class Info extends React.PureComponent {

    render(){
        const {online, offline, total, without} = this.props;
        return (
            <div>
                <div>online devices - {online}</div>
                <div>offline devices - {offline}</div>
                <div>without status - {without}</div>
                <div>total devices - {total}</div>
            </div>
        )
    }
}

const makeMapStateToProps = () => {
    const mapStateToProps = (state, props) => {
        return {
            online: getCountOnline(state),
            offline: getCountOffline(state),
            total: getTotalCount(state),
            without: getCountWithoutStatus(state)
        }
    }
    return mapStateToProps;
}
export default connect(makeMapStateToProps)(Info)
