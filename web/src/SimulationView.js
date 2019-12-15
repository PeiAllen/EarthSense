/* global google */
import React from 'react';
import GoogleMapReact from 'google-map-react';

var points=[{x:43.2557,y:-79.8711,w:1},{x:43.4041,y:-80.1454,w:0.8},{x:43.2187,y:-79.67094,w:0.4},{x:43.2262, y:-79.9888,w:0.9},{x:43.2157, y:-79.9655,w:0.6},{x:43.1982, y:-79.9785,w:0.95},{x:43.2012,y:-80.0094,w:0.78},{x:43.1826, y:-80.0005,w:0.43},{x:43.1636, y:-79.9731,w:0.99},{x:43.1706, y:-79.9841,w:0.72}]
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
      points.push({x:lat,y:lng,w:0.5});
      this.MapRef.heatmap.data.push({location: new google.maps.LatLng(lat, lng), weight: 0.5});
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

