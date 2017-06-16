import React from 'react';
import ReactDOM from 'react-dom';
import HappyHour from './HappyHour.js';
import { Router, Route, browserHistory, Link } from 'react-router';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// import _ from "lodash";
// import Helmet from "react-helmet";
// import GoogleMap from "react-google-map"
// import GoogleMapLoader from "react-google-maps-loader"

// const apiKey = 'AIzaSyBVzn1qT7LjhZ5m_frrbDT1lNZhNCsN0Jw'



class Map extends React.Component {
	render() {
		const markers = this.props.markers || []
		return (
			<GoogleMap
			className="nick"
				defaultZoon={3}
				defaultCenter={{lat: -25.363882, lng: 131.044832}}>
				{markers.map((marker, index) => (
					<Marker {...marker} />
					)
				)} 
				
			</GoogleMap>
		)
	}
}
export default withGoogleMap(Map)

// const Map = ({googleMaps}) => (
// 	<div className="map">
// 		<GoogleMap
// 			googleMaps={googleMaps}
// 			coordinates={[
// 				{
// 					title: "Toulouse",
// 					position: {
// 						lat: 43.604363,
// 						lng: 1.443363,
// 					}, 
// 					// onLoaded: (googleMaps, map, marker) => {
// 					// 	// marker.setAnimation(googleMaps.Animation.BOUNCE)

// 					// 	const infoWindow = new googleMaps.infoWindow({
// 					// 		content: `<div>
// 					// 					<h3>Toulouse</h3>
// 					// 					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, fugit?</p>
// 					// 				</div>`,
// 					// 	})
// 					// 	// Open InfoWindow when Marker will be clicked
// 					// 	googleMaps.event.addListener(marker, "click", () => {
// 					// 	  infoWindow.open(map, marker)
// 					// 	})

// 					// 	// Change icon when Marker will be hovered
// 					// 	googleMaps.event.addListener(marker, "mouseover", () => {
// 					// 	  marker.setIcon(iconMarkerHover)
// 					// 	})

// 					// 	googleMaps.event.addListener(marker, "mouseout", () => {
// 					// 	  marker.setIcon(iconMarker)
// 					// 	})

// 					// 	infoWindow.open(map, marker)
// 					// },
// 				}
// 				]}
// 				center={{lat: 43.604363, lng: 1.4433663}}
// 				zoom={8}
// 				onLoaded={(googleMaps, map) => {
// 					map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
// 				}}
// 			/>
			
// 	</div>
// )
// // Map.propTypes = {
// //   googleMaps: React.PropTypes.object.isRequired,
// // }

// export default GoogleMapLoader(Map, {
//   libraries: ["places"],
//   key: 'AIzaSyBVzn1qT7LjhZ5m_frrbDT1lNZhNCsN0Jw',
// })




// const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//     onClick={props.onMapClick}
//   >
//     {props.markers.map(marker => (
//       <Marker
//         {...marker}
//         onRightClick={() => props.onMarkerRightClick(marker)}
//       />
//     ))}
//   </GoogleMap>
// ));

// export default class Map extends React.Component {
// constructor() {
// 	super();
// 	  this.state = {
// 	    markers: [{
// 	      position: {
// 	        lat: 25.0112183,
// 	        lng: 121.52067570000001,
// 	      },
// 	      key: `Taiwan`,
// 	      defaultAnimation: 2,
// 	    }],
// 	  };
//   this.handleMapLoad = this.handleMapLoad.bind(this);
//   // this.handleMapClick = this.handleMapClick.bind(this);
//   // this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
// }


//   handleMapLoad(map) {
//     this._mapComponent = map;
//     if (map) {
//       console.log(map.getZoom());
//     }
//   }

//   /*
//    * This is called when you click on the map.
//    * Go and try click now.
//    */
//   // handleMapClick(event) {
//   //   const nextMarkers = [
//   //     ...this.state.markers,
//   //     {
//   //       position: event.latLng,
//   //       defaultAnimation: 2,
//   //       key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
//   //     },
//   //   ];
//   //   this.setState({
//   //     markers: nextMarkers,
//   //   });

//   //   if (nextMarkers.length === 3) {
  //     this.props.toast(
  //       `Right click on the marker to remove it`,
  //       `Also check the code!`
  //     );
  //   }
  // }

  // handleMarkerRightClick(targetMarker) {
  //   /*
  //    * All you modify is data, and the view is driven by data.
  //    * This is so called data-driven-development. (And yes, it's now in
  //    * web front end and even with google maps API.)
  //    */
  //   const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
  //   this.setState({
  //     markers: nextMarkers,
  //   });
  // }

//   render() {
//     return (
//       <div style={{height: `100%`}}>
//         <Helmet
//           title="Getting Started"
//         />
//         <GettingStartedGoogleMap
//           containerElement={
//             <div style={{ height: `100%` }} />
//           }
//           mapElement={
//             <div style={{ height: `100%` }} />
//           }
//           onMapLoad={this.handleMapLoad}
//           // onMapClick={this.handleMapClick}
//           markers={this.state.markers}
//           // onMarkerRightClick={this.handleMarkerRightClick}
//         />
//       </div>
//     );
//   }
// }