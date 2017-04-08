import React, { Component } from 'react';
import { Image, DatePickerIOS, View, ScrollView, StyleSheet, Linking } from 'react-native';
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

        let attendees = this.props.userSelectedEvent.eventAttendees.map(attendee => {
            return (
                <View key={attendee.name}>
                    <Thumbnail circle source={{uri: attendee.picture}} />                
                    <Text>Name: {attendee.name} </Text>
                    <Text>Gender: {attendee.gender} </Text>
                    <Text style={{color: 'blue'}}
                        onPress={() => Linking.openURL(attendee.link)}>
                        Profile
                    </Text>                    
                </View>
            )
        })

        return (
            <Container style={{backgroundColor: 'rgb(51,53,51)'}} >
                <Header style={{backgroundColor: 'rgb(51,53,51)', borderBottomColor: 'rgb(245, 203, 92)', borderBottomWidth: 2, borderBottomStyle: 'solid' }} > 
                    <Left>
                        <Button transparent onPress={() => { this.cancelViewEvent()}} >
                            <Icon style={{color: 'rgb(245, 203, 92)'}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', fontSize: 18}} >Event</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Text></Text>
                <View style={{flexDirection: 'column', alignItems: 'center', }}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', }}>
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >What</Text>                        
                            <View style={{height: 150, width: 190, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                                <Text> </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', }}>                        
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >When</Text>                        
                            <View style={{height: 150, width: 190, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                                <Text> </Text>
                            </View>
                        </View>
                    </View>
                    <Text></Text>                    
                    <View style={{flexDirection: 'column', alignItems: 'center', }}>                    
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >Who</Text>                    
                        <View style={{height: 600, width: 380, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                            <Text> </Text>
                        </View>
                    </View>
                </View>



                <View>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}} >Event Name</Text>
                    <Text>{this.props.userSelectedEvent.eventName}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Category</Text>
                    <Text>{this.props.userSelectedEvent.eventType}</Text>                    
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Description</Text>
                    <Text>{this.props.userSelectedEvent.eventDescription}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>EventLocation</Text>
                    <Text>{this.props.userSelectedEvent.eventFacilityName}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Date</Text>
                    <Text>{this.getFormattedDate()}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Time</Text>
                    <Text>{this.getFormattedTime()}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Duration</Text>
                    <Text>{this.props.userSelectedEvent.eventDuration}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Organizer Name</Text>
                    <Text>{this.props.userSelectedEvent.eventOrganizer.name}</Text>
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Organizer Image</Text>
                    <Thumbnail  circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: this.props.userSelectedEvent.eventOrganizer.picture}} />                    
                    <Text style={{fontFamily: 'Bungee-Regular',color: 'rgb(245, 203, 92)'}}>Event Participants</Text>
                    {attendees}
                    <Button style={{backgroundColor: 'rgb(245, 203, 92)'}} onPress={() => { this.eventChatView()}} >
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >Event Chat</Text>
                        <Icon style={{color: 'rgb(245, 203, 92)'}} name="ios-chatbubbles" />
                    </Button>
                    <Button style={{backgroundColor: 'rgb(245, 203, 92)'}} onPress={() => { this.joinEvent(); this.cancelViewEvent()}} >
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >Join</Text>
                        <Icon style={{color: 'rgb(245, 203, 92)' }} name="ios-chatbubbles" />
                    </Button>
                </View>
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

