import React from 'react';
import { connect } from 'react-redux';
import {getCountOffline, getCountOnline} from "../selectors/index";


class Info extends React.PureComponent {

    render(){
        const {online, offline} = this.props;
        return (
            <div>
                <div>online - {online}</div>
                <div>offline - {offline}</div>
            </div>
        )
    }
}

const makeMapStateToProps = () => {
    const mapStateToProps = (state, props) => {
        return {
            online: getCountOnline(state),
            offline: getCountOffline(state),
        }
    }
    return mapStateToProps;
}
export default connect(makeMapStateToProps)(Info)
