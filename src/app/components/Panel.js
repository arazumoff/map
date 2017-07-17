import React from 'react';
import { connect } from 'react-redux';

import Info from "./Info";

class PanelItem extends React.PureComponent{

    render(){
        const {device} = this.props;
        return (
            <div key={device.mac}>
                <div>mac:{device.mac}</div>
                <div>isOnline:{device.status.isOnline}</div>
            </div>
        )
    }
}

class PanelPage extends React.Component{
    render(){
        const {currentPage} = this.props;
        return (
            <div></div>
        )
    }
}

class Panel extends React.Component{

    render() {
        const {devices, currentPage, pages} = this.props;
        const html = (<div></div>);
        /*
        const html = devices.map((device) =>
                <PanelItem device={device}/>
        )
        */
        return (<div className="col-sm-3">
            <Info/>
            <div>{html}</div>
            <div>{currentPage}</div>
            <div>{pages}</div>
        </div>)
    }
}

const makeMapStateToProps = () => {
    const mapStateToProps = (state, props) => {
        return {
            devices: state.status
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps)(Panel)
