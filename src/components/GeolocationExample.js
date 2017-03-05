import React, { Component } from 'react';
import {
   View,
   StyleSheet
} from 'react-native';
import MapView from 'react-native-maps'
import { Container, Content, Button, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';

export class GeolocationExample extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {

    	// let categories = this.props.categories.map((category,index)=>{
		// 	return (
		// 		<li key={index} className="list-group-item">{category.name.capitalize()}</li>
		// 	);
		// })


        return (
            <View style = {styles.container}>
                <MapView
                    showsUserLocation = 'true'
                    followUserLocation = 'true'
                    style={styles.map}
                    region={{
                        latitude: 40.75387, //props.lastPosition.coords.latitude,
                        longitude: -73.9920, //props.lastPosition.coords.longitude,
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0201,
                    }}
                >

                </MapView>
            </View>            
        )
    }
}
/*
                    {this.props.markers.map(marker => (
                        <MapView.Marker                        
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                ))}*/


   const styles = StyleSheet.create({
       container: {
           flex: 1,
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: '#F5FCFF',
       },
       map: {
           position: 'absolute',
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
       }
   })

const mapStateToProps = (state, props) => ({
    parkType: state.parkType,
    facilityData: state.facilityData,
    markers: state.markers
});


export default connect(mapStateToProps)(GeolocationExample);







/*
    if (props.lastPosition === "unknown") {
        console.log(props.lastPosition);
        console.log('PROPS UNKNOWN, RENDERING STATE DEFAULT LOCATION')
        return (
            <View style = {styles.container}>
                <MapView
                    showsUserLocation = 'true'
                    followUserLocation = 'true'
                    style={styles.map}
                    region={state}
                />
            </View>
        )
    } else {
        console.log('PROPS FOUND, RENDERING USER LOCATION')
        console.log(props.lastPosition.coords);
        // let location = props.lastPosition
        // console.log('CONSOLE LOCAIOTJN', location)
        // console.log('LOCATION COORDS', location["coords"]);*/

//    return (
//       /*<View style = {styles.container}>

//          <Text>
//             <Text style = {styles.boldText}>
//                Initial position:
//             </Text>
//             {props.initialPosition}
//          </Text>
//          <Text>
//             <Text style = {styles.boldText}>
//                Current position:
//             </Text>
//             {props.lastPosition}
//          </Text>

//       </View>*/
    



//    );




