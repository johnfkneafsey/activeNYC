import React, { Component } from 'react';
import { Image, DatePickerIOS, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Thumbnail, Label, Header, Left, Right, Button, Icon, Body, Title, Text } from 'native-base';
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

    eventChatView() {
        this.props.dispatch(actions.renderEventChatView());
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
                    <Title>Event Name</Title>
                    <Text>{this.props.userSelectedEvent.eventName}</Text>
                    <Title>Event Description</Title>
                    <Text>{this.props.userSelectedEvent.eventDescription}</Text>
                    <Title>EventLocation</Title>
                    <Text>{this.props.userSelectedEvent.eventLocation}</Text>
                    <Title>Event Date</Title>
                    <Text>{this.props.userSelectedEvent.eventDate}</Text>
                    <Title>Event Time</Title>
                    <Text>{this.props.userSelectedEvent.eventTime}</Text>
                    <Title>Event Name</Title>
                    <Text>{this.props.userSelectedEvent.eventName}</Text>
                    <Title>Event Organizer Name</Title>
                    <Text>{this.props.userSelectedEvent.eventOrganizerName}</Text>
                    <Title>Event Organizer Imae</Title>
                    <Thumbnail  circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: "https://unsplash.it/40/40/?random"}} />                    
                    <Title>Event Participants</Title>
                    <Text>{this.props.userSelectedEvent.eventParticipants}</Text>
                    <Button transparent onPress={() => { this.eventChatView()}} >
                        <Text>Event Discussion</Text>
                        <Icon name="ios-chatbubbles" />
                    </Button>
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


/*
Title USER                                     Organizer: 
                                            [           ]
Description:  USER                          [           ] FB
~~~~~~~~~~~~~~~~~~~~~~~~~~                  [           ]
~~~~~~~~~~~~~~~~~~~~~~~~~~                  Beyonce Knowles FB
~~~~~~~~~~~~~~~~~~~~~~~~~~                   

Time: USER

Location: CURRENTPARK
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Attending:  EVENTATTENDEES  
[  ][  ][  ][  ][  ]
[  ][  ][  ][  ][  ]   ... and 3 others


Chat:
|
|
|
|
|
|
|
|
|




*/