import React, { Component } from 'react';
import { Container, Content, Picker } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import MapView from 'react-native-maps';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';


export class DisplayParks extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Text> HELLO HELLO </Text>
        )
    }
}




const mapStateToProps = (state, props) => ({
    parkType: state.parkType
});


export default connect(mapStateToProps)(DisplayParks);