/* global google */
import React from 'react';
import { compose, withProps,lifecycle } from "recompose"
import { TrafficLayer,DirectionsRenderer, withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
var points=[{x:43.2557,y:-79.8711,w:1},{x:43.4041,y:-80.1454,w:0.8},{x:43.2187,y:-79.67094,w:0.4},{x:43.2262, y:-79.9888,w:0.9},{x:43.2157, y:-79.9655,w:0.6},{x:43.1982, y:-79.9785,w:0.95},{x:43.2012,y:-80.0094,w:0.78},{x:43.1826, y:-80.0005,w:0.43},{x:43.1636, y:-79.9731,w:0.99},{x:43.1706, y:-79.9841,w:0.72}];

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization,geometry,drawing,places&key=AIzaSyAkQpJRUfUs2qOU_9PZUfeosSpP_M_8Jts",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `92vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount(){
        const toloc={};
        var positions=points.map(item => { return {location: new google.maps.LatLng(item.x, item.y), weight: item.w}});
        this.setState({
            positions:positions,
            onSearchBoxMount: ref=>{
                toloc.SearchBox=ref;
            },
            onClick: (event) => {
                var newpositions=positions;
                newpositions.push({location: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()), weight: 0.5});
                this.setState({
                    positions:[],
                })
                this.setState({
                    positions:newpositions,
                })
            },
            onChange: ()=>{
                const DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route({
                    origin: {placeId:"ChIJxw89bEObLIgR3IKdmOSa6Kw"},
                    destination: {placeId:toloc.SearchBox.getPlaces()[0].place_id},
                    travelMode: google.maps.TravelMode.WALKING,
                    provideRouteAlternatives: true,
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result,
                        });
                    } else {
                        this.setState({
                            directions: undefined,
                        });
                    }
                });
            }
        })
    },

  })
)((props)=>
  <GoogleMap
    onClick={(e)=>props.onClick(e)}
    defaultZoom={11}
    defaultCenter={{ lat: 43.2557,lng: -79.8711 }}
  >
      <TrafficLayer autoUpdate />
      <HeatmapLayer
      options={{radius: 60,opacity:0.6}}
      data={props.positions}
      />
      {props.directions&&props.directions.routes.map((cur, i) => <DirectionsRenderer directions={props.directions} defaultRouteIndex={i}/>)}
      <SearchBox
      ref={props.onSearchBoxMount}
      controlPosition={google.maps.ControlPosition.TOP}
      onPlacesChanged={props.onChange}
    >
      <input
        type="text"
        placeholder="Where do you want to go?"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
  </GoogleMap>
)

class Map extends React.Component {
      render() {
        return (
          <MapComponent/>
        )
      }
}

export default Map;
