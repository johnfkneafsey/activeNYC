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
        this.getFormattedTime = this.getFormattedTime.bind(this);
        this.joinEvent = this.joinEvent.bind(this);
    }


    cancelViewEvent() {
        this.props.dispatch(actions.renderViewEventView());
    }

    eventChatView() {
        this.props.dispatch(actions.renderEventChatView());
    }

    getFormattedTime() {
        let dateObj = new Date(Date.parse(this.props.userSelectedEvent.eventStartTime));
        let hours;
        if (dateObj.getHours() > 12) {
            hours = dateObj.getHours() - 12;
        } else {
            hours = dateObj.getHours();
        }
        let minutes = dateObj.getMinutes()
        let formattedTime = `${hours}:${minutes}`
        console.log(formattedTime)
        return formattedTime
    }

    getFormattedDate() {
       let dateObj = new Date(Date.parse(this.props.userSelectedEvent.eventStartTime));
       const days = {
           0: "Sunday",
           1: "Monday",
           2: "Tuesday",
           3: "Wednesday",
           4: "Thursday",
           5: "Friday",
           6: "Saturday"
       }
       const months = {
           0: "January",
           1: "February",
           2: "March",
           3: "April",
           4: "May",
           5: "June",
           6: "July",
           7: "August",
           8: "September",
           9: "October",
           10: "November",
           11: "December"
       }
       let weekdayValue = dateObj.getDay();
       let weekday = days[weekdayValue];
       let monthValue = dateObj.getMonth();
       let month = months[monthValue];
       let date = dateObj.getDate();

       let formattedDate = `${weekday}, ${month} ${date}`;
       return formattedDate;
    }

    joinEvent() {
        this.props.dispatch(actions.asyncJoinEvent(this.props.user, this.props.userSelectedEvent.eventStartTime));
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
                    <Title>Event Category</Title>
                    <Text>{this.props.userSelectedEvent.eventType}</Text>                    
                    <Title>Event Description</Title>
                    <Text>{this.props.userSelectedEvent.eventDescription}</Text>
                    <Title>EventLocation</Title>
                    <Text>{this.props.userSelectedEvent.eventFacilityName}</Text>
                    <Title>Event Date</Title>
                    <Text>{this.getFormattedDate()}</Text>
                    <Title>Event Time</Title>
                    <Text>{this.getFormattedTime()}</Text>
                    <Title>Event Duration</Title>
                    <Text>{this.props.userSelectedEvent.eventDuration}</Text>
                    <Title>Event Organizer Name</Title>
                    <Text>{this.props.userSelectedEvent.eventOrganizer.name}</Text>
                    <Title>Event Organizer Imae</Title>
                    <Thumbnail  circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: this.props.userSelectedEvent.eventOrganizer.picture}} />                    
                    <Title>Event Participants</Title>
                    <Text>{this.props.userSelectedEvent.eventParticipants}</Text>
                    <Button transparent onPress={() => { this.eventChatView()}} >
                        <Text>Discuss!</Text>
                        <Icon name="ios-chatbubbles" />
                    </Button>
                    <Button transparent onPress={() => { this.joinEvent(); this.cancelViewEvent()}} >
                        <Text>Join!</Text>
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
    userSelectedEventStartTime: state.userSelectedEventStartTime,
    userSelectedEventEndTime: state.userSelectedEventEndTime,
    userSelectedEventDuration: state.userSelectedEventDuration,
    userSelectedEvent: state.userSelectedEvent,
    user: state.user
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