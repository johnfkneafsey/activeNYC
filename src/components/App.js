import React from 'react';
import ParkSelection from './ParkSelection';
import HomeContainer from './HomeContainer';
import ListView from './ListView';
import EventsMain from './EventsMain';
import NewEvent from './NewEvent';
import ViewEvent from './ViewEvent';
import Login from './Login';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import store from '../store/store';

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
    
    if (this.props.user === null) {
        return (
            <Login />
        )
    }    
        
    if (this.props.parkType === null) {
        return (
            <ParkSelection />
        )
    } else if (this.props.renderEventsView % 2 === 0) {

        if (this.props.renderNewEventView % 2 === 0) {
            return (
                <NewEvent />
            )
        }

        if (this.props.renderViewEventView % 2 === 0) {
            return (
                <ViewEvent />
            )
        }

        return (
            <EventsMain />
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
    renderListView: state.renderListView,
    renderEventsView: state.renderEventsView,
    renderNewEventView: state.renderNewEventView,
    renderViewEventView: state.renderViewEventView,
    user: state.user
});

export default connect(mapStateToProps)(App);