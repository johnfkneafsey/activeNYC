import React, { Component } from 'react'
import GeolocationExample from './GeolocationExample'
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import { Container, Content, Button, Text } from 'native-base';
import { View } from 'react-native';

export  class HomeContainer extends Component {

   constructor() {
      super();
      this.state = {
         initialPosition: 'unknown',
         lastPosition: 'unknown'
      }
   }
   watchID = (null: ?number);

   componentDidMount = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            var initialPosition = JSON.stringify(position);
            this.setState({});
            this.props.dispatch(actions.saveInitialPosition(JSON.parse(initialPosition)))
       
         },
         (error) => alert(error.message),
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
         var lastPosition = JSON.stringify(position);
         this.setState({lastPosition});
         this.props.dispatch(actions.saveLastPosition(JSON.parse(lastPosition)))
         this.props.dispatch(actions.showMarkers(this.props.facilityData, this.props.lastPosition.coords.latitude, this.props.lastPosition.coords.longitude, 5))
      });
   }
   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }

   render() {
      return (

                <GeolocationExample
                initialPosition = {this.state.initialPosition}
                lastPosition = {this.state.lastPosition}
                />


      );
   }
}

const mapStateToProps = (state, props) => ({
    parkType: state.parkType,
    facilityData: state.facilityData,
    initialPosition: state.initialPosition,
    lastPosition: state.lastPosition
});


export default connect(mapStateToProps)(HomeContainer);