import React, { Component } from 'react';
import { Image, DatePickerIOS, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Header, Left, Right, Button, Icon, Body, Title, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class NewEvent extends React.Component {
    constructor(props) {
        super(props);
        this.cancelNewEvent = this.cancelNewEvent.bind(this);     
        this.setTitle = this.setTitle.bind(this); 
        this.onDateChange = this.onDateChange.bind(this); 
        this.addHour = this.addHour.bind(this); 
        this.subtractHour = this.subtractHour.bind(this); 
    }

    cancelNewEvent() {       
        this.props.dispatch(actions.renderNewEventView());       
    }

    setTitle(title) {
        console.log('INPUT title', title)
        this.props.dispatch(actions.userSelectedEventTitle(title));
    }

    setDescription(description) {
        console.log('INPUT description', description)
        this.props.dispatch(actions.userSelectedEventDescription(description));
    }

    onDateChange = (startTime) => {
        console.log('THIS IS START TIME ' , startTime);
        this.props.dispatch(actions.userSelectedEventStartTime(startTime, this.props.userSelectedEventDuration));
    };

    addHour() {
        if (this.props.userSelectedEventDuration < 5) {
            this.props.dispatch(actions.addHour());
        }
    }

    subtractHour() {
        if (this.props.userSelectedEventDuration > 1) {
            this.props.dispatch(actions.subtractHour());
        }
    }

    createEvent () {
        let create_eventName = this.props.userSelectedEventTitle;
        let create_eventType = this.props.parkType;
        let create_eventOrganizer = this.props.user;
        let create_EventAttendees = [];
        let create_eventDescription = this.props.userSelectedEventDescription;
        let create_eventDate = this.props.selectedDate;
        let create_eventStartTime = this.props.userSelectedEventStartTime;
        let create_eventDuration = this.props.userSelectedEventDuration;
        let create_eventChat = [];
        let create_eventFacilityName = this.props.selectedFacility.Name;

        let eventObj = {
            eventName: create_eventName,
            eventType: create_eventType,
            eventOrganizer: create_eventOrganizer,
            eventAttendees: create_EventAttendees,
            eventDescription: create_eventDescription,
            eventDate: create_eventDate,
            eventStartTime: create_eventStartTime,
            eventDuration: create_eventDuration,            
            eventChat: create_eventChat,
            eventFacilityName: create_eventFacilityName
        }
        console.log('ITS THE EVENT OBJ', eventObj);
        this.props.dispatch(actions.createEvent(eventObj));
        this.props.dispatch(actions.loadEvents());
        this.props.dispatch(actions.renderNewEventView());
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                        <Title>Create</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.cancelNewEvent()}} >
                            <Text>Cancel </Text>
                            <Icon name="ios-backspace" />
                        </Button>
                    </Right>
                </Header>  
                <Content>
                    <Form>
                        <Item >
                            <Label>Event Title: </Label>
                            <Input   onChangeText={(title) => {this.setTitle(title); }}/>
                        </Item>
                        <Item  last>
                            <Label>Description: </Label>
                            <Input  onChangeText={(description) => {this.setDescription(description); }}/>
                        </Item>
                        <Item>
                            <View>

                            </View>
                        </Item>
                    </Form>
                    <View>
                        <DatePickerIOS
                            date={this.props.userSelectedEventStartTime}
                            mode="datetime"
                            onDateChange={this.onDateChange}
                            minuteInterval={10}
                        />
                    </View>
                    <View style={{flexDirection: "row" }}>
                        
                        <Button iconLeft light onPress={() => { this.subtractHour() }}>
                            
                            <Icon name='arrow-back' />
                        </Button>
                        <Text>{this.props.userSelectedEventDuration} Hours </Text> 

                        <Button iconRight light onPress={() => { this.addHour() }}>
                            
                            <Icon name='arrow-forward' />
                        </Button>
                   
                    </View>
                    <View>
                        <Button  light onPress={() => { this.createEvent() }}>
                            <Text>Create</Text>
                            <Icon name='checkbox' />
                        </Button>
                    </View>
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
    userSelectedEventTitle: state.userSelectedEventTitle,
    userSelectedEventDescription: state.userSelectedEventDescription,
    user: state.user,
    selectedDate: state.selectedDate
});


export default connect(mapStateToProps)(NewEvent);