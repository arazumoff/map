import React from 'react';
import {Map, TileLayer, LayerGroup} from 'react-leaflet';
import { connect } from 'react-redux';
import {PruneClusterForLeaflet, PruneCluster} from '../PruneCluster';


class Mark extends LayerGroup{

    render(){
        console.log('yes');
        const {markers} = this.props;
        const pruneCluster = new PruneClusterForLeaflet();

        markers.map(item=> {
            var m = new PruneCluster.Marker(item.location.lat, item.location.lon);
            pruneCluster.RegisterMarker(m);
        });
        //this.layerContainer.addLayer(pruneCluster);
        return (null)
    }
}



class Mapper extends React.Component{

    render() {
        const {markers} = this.props;

        return (<div className="col-sm-9">
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
            markers: state.location,
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps)(Mapper)
