/* global google */
import React from 'react';
import GoogleMapReact from 'google-map-react';

var points=[{x:43.2557,y:-79.8711,w:20}]
const heatMapData={positions: [
  ],
  options: {   
    radius: 60,   
    opacity: 0.6,
  }
}
class SimulationView extends React.Component {
    constructor(){
      super();
      this.MapMount=this.MapMount.bind(this);
      this.MapClick=this.MapClick.bind(this);
      this.MapRef=React.createRef();
    }
    static defaultProps = {
        center: {
          lat: 43.2557,
          lng: -79.8711
        },
        zoom: 11
    };
    MapMount(){
      for(var point of points)this.MapRef.heatmap.data.push({location: new google.maps.LatLng(point.x, point.y), weight: point.w});
    }
    MapClick({lat,lng}) {
      this.MapRef.heatmap.data.push({location: new google.maps.LatLng(lat, lng), weight: 1});
    }
    render() {
      return (
        <div style={{ height: '92vh', width: '100%' }}>
          <GoogleMapReact  
            ref={el => this.MapRef = el}  
            bootstrapURLKeys={{
                key: 'AIzaSyAkQpJRUfUs2qOU_9PZUfeosSpP_M_8Jts', 
                language: 'en'
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            heatmapLibrary={true}     
            onTilesLoaded={this.MapMount}     
            heatmap={heatMapData}
            onClick={this.MapClick}  
          >
          </GoogleMapReact>
        </div>
      );
    }

}

export default SimulationView;

