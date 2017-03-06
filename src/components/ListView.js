
import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Dimensions,
    InteractionManager,
    TouchableHighlight,
    Linking,
    ScrollView,
    Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Container, Card, Thumbnail, CardItem, Content, Button, Footer, FooterTab, Icon, Header, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class ListView extends React.Component {
    constructor(props) {
        super(props);
    }  

  render() {
      return(
        <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Text style={{fontSize:96}}>If you like</Text>

          <Text style={{fontSize:96}}>Scrolling down</Text>

          <Text style={{fontSize:96}}>What's the best</Text>

          <Text style={{fontSize:96}}>Framework around?</Text>

          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}

const mapStateToProps = (state, props) => ({
    parkType: state.parkType,
    facilityData: state.facilityData,
    markers: state.markers,
    initialPosition: state.initialPosition,
    lastPosition: state.lastPosition,
    userLatitude: state.userLatitude,
    userLongitude: state.userLongitude,
    selectedFacility: state.selectedFacility
});


export default connect(mapStateToProps)(ListView);