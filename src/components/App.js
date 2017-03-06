import React from 'react';
import ParkSelection from './ParkSelection';
import HomeContainer from './HomeContainer';
import ListView from './ListView';
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
            if (this.props.renderListView % 2 === 0) {
                return (
                    <ListView />
                )
            }
            return (
                    <HomeContainer />
                    )
        }
    }
}


const mapStateToProps = (state, props) => ({
    parkType: state.parkType,
    renderListView: state.renderListView
});

export default connect(mapStateToProps)(App);