import React, { Component } from 'react';
import { Image, DatePickerIOS, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Header, Left, Right, Button, Icon, Body, Title, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class ViewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.cancelViewEvent = this.cancelViewEvent.bind(this); 
    }


    cancelViewEvent() {
        this.props.dispatch(actions.renderViewEventView());

    }

    
    render() {

        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title>Event</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.cancelViewEvent()}} >
                            <Text>Close </Text>
                            <Icon name="ios-backspace" />
                        </Button>
                    </Right>
                </Header>  

                <Content>

                    <Title>{this.props.userSelectedEvent.eventName}</Title>

                </Content>
            </Container>
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
    selectedFacility: state.selectedFacility,
    renderListView: state.renderListView,
    renderEventsView: state.renderEventsView,
    icons: state.icons,
    globalEventsFAKE: state.globalEventsFAKE,
    userSelectedEventStartTime: state.userSelectedEventStartTime,
    userSelectedEventEndTime: state.userSelectedEventEndTime,
    userSelectedEventDuration: state.userSelectedEventDuration,
    userSelectedEvent: state.userSelectedEvent
});


export default connect(mapStateToProps)(ViewEvent);