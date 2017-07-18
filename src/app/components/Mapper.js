import React from 'react';
import {Map, TileLayer, LayerGroup} from 'react-leaflet';
import { connect } from 'react-redux';
import {PruneClusterForLeaflet, PruneCluster} from '../PruneCluster';
import {getItemsOnline} from '../selectors';

class Mark extends LayerGroup{

    constructor(props) {
        super(props);
        console.log('test')
        this.pruneCluster = new PruneClusterForLeaflet();
    }

    componentDidMount(){
        this.layerContainer.addLayer(this.pruneCluster);
    }

    componentWillReceiveProps(nextProps) {
        this.pruneCluster.RemoveMarkers();
    }

    render(){
        const {markers} = this.props;
        markers.forEach(item=> {
            var m = new PruneCluster.Marker(item.location.lat, item.location.lon);
            m.data.popup = `mac-address: ${item.mac}<br>location:${item.location.lat}, ${item.location.lon}<br>
            status: ${item.status.isOnline}`;
            this.pruneCluster.RegisterMarker(m);
        });
        this.pruneCluster.ProcessView();
        return (null)
    }
}



class Mapper extends React.Component{

    render() {
        const {markers} = this.props;

        return (<div className="col-sm-9">
            {markers.length}
            <Map id="map" className="markercluster-map" center={[51.0, 19.0]} zoom={2} maxZoom={18}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                <Mark markers={markers}/>

            </Map>
        </div>)
    }
}
const makeMapStateToProps = () => {
    const mapStateToProps = (state, props) => {
        return {
            markers: getItemsOnline(state),
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps)(Mapper)
