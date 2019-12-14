/* global google */
import React from 'react';
import GoogleMapReact from 'google-map-react';


const heatMapData={positions: [
  ],
  options: {   
    radius: 10,   
    opacity: 0.6,
  }
}
class HeatMap extends React.Component {
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
      this.MapRef.heatmap.data.push({location: new google.maps.LatLng(43.2557, -79.8711), weight: 1});
    }
    MapClick({lat,lng}) {
      this.MapRef.heatmap.data.push({location: new google.maps.LatLng(lat, lng), weight: 1});
    }
    render() {
      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact  
            ref={el => this.MapRef = el}  
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

export default HeatMap;

