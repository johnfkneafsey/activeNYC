import React from 'react';
import ParkSelection from './ParkSelection';
import DisplayParks from './DisplayParks';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import store from '../store/store';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        
    if (this.props.parkType === null) {
            return (
                    <ParkSelection />
                    )
        }
        else if (this.props.parkType) {
            return (
                    <DisplayParks />
                    )
        }
    }
}


const mapStateToProps = (state, props) => ({
    parkType: state.parkType
});

export default connect(mapStateToProps)(App);