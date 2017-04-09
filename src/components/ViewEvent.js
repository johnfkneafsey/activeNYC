import React, { Component } from 'react';
import { Image, DatePickerIOS, View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Container, Content, Form, Item, Input, Thumbnail, Label, Header, Left, Right, Button, Icon, Body, Title, Text, Footer, FooterTab} from 'native-base';
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

    navigateToFacility(url) {
        Linking.openURL(url);
    }    

    render() {

        let hrs = 'hour';
        if (this.props.userSelectedEventDuration > 1) {
            hrs = 'hours'
        }

        let attendees = this.props.userSelectedEvent.eventAttendees.map(attendee => {
            return (
                <View key={attendee.name} style={{marginHorizontal: 6}}>
                    <Thumbnail square source={{uri: attendee.picture}} />                
                    <Text>{attendee.name} </Text>
                    <Text style={{color: 'black'}}
                        onPress={() => Linking.openURL(attendee.link)}>
                        View Profile
                    </Text>                    
                </View>
            )
        })

        return (
            <View style={{flex: 1}} > 
                <ScrollView style={{backgroundColor: 'rgb(51,53,51)'}} >
                    <Header style={{backgroundColor: 'black', borderBottomColor: 'rgb(245, 203, 92)', borderBottomWidth: 2, borderBottomStyle: 'solid' }} > 
                        <Left>
                            <Button transparent onPress={() => { this.cancelViewEvent()}} >
                                <Icon style={{color: 'rgb(245, 203, 92)'}} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', fontSize: 18}} >View Event</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <Text></Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', }}>
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >What</Text>                        
                        <View style={{height: 150, width: 380, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                            <Text style={{fontFamily: 'Bungee-Regular', marginHorizontal: 6, marginTop: 6}} >Event Name:</Text>
                            <Text style={{ marginHorizontal: 6}} >{this.props.userSelectedEvent.eventName}</Text>
                            <Text></Text>
                            <Text style={{ marginHorizontal: 6, fontFamily: 'Bungee-Regular'}} >Description:</Text>
                            <Text style={{ marginHorizontal: 6}}>{this.props.userSelectedEvent.eventDescription}</Text>
                        </View> 
                        <Text></Text>                   
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', alignItems: 'center', }}>
                                <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', }} >When</Text>                        
                                <View style={{height: 150, width: 180, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                                    <Text style={{ fontFamily: 'Bungee-Regular',  marginHorizontal: 6, marginTop: 6}} >Date:</Text>
                                    <Text style={{ marginHorizontal: 6}} >{this.getFormattedDate()}</Text>
                                    <Text></Text>
                                    <Text style={{fontFamily: 'Bungee-Regular',  marginHorizontal: 6}} >Time:</Text>
                                    <Text style={{ marginHorizontal: 6}} >{this.getFormattedTime()}</Text>
                                    <Text></Text>
                                    <Text style={{fontFamily: 'Bungee-Regular',  marginHorizontal: 6}} >Duration:</Text>
                                    <Text style={{ marginHorizontal: 6}}>{this.props.userSelectedEvent.eventDuration} {hrs}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', }}>                        
                                <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >Where</Text>                        
                                <View style={{height: 150, width: 180, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                                    <Text style={{fontFamily: 'Bungee-Regular',  marginHorizontal: 6, marginTop: 6}} >Facility:</Text>
                                    <Text style={{ marginHorizontal: 6}} >{this.props.userSelectedEvent.eventFacilityName}</Text>
                                    <Text></Text>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}} >
                                        <Button transparent style={{backgroundColor: 'black', marginLeft: 35}} onPress={() => { this.navigateToFacility('http://maps.apple.com/?saddr=' + this.props.userLatitude + ',' + this.props.userLongitude + '&daddr=' + + this.props.selectedFacility.lat + ',' + this.props.selectedFacility.lon)}}>
                                            <Icon style={{color: 'rgb(245, 203, 92)'}} name="ios-walk-outline" />
                                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', fontSize: 12, }}>Show me</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text></Text>                    
                        <View style={{flexDirection: 'column', alignItems: 'center', }}>                    
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}} >Who</Text>                    
                            <View style={{height: 600, width: 380, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6}}>
                                <Text style={{ fontFamily: 'Bungee-Regular',  marginHorizontal: 6, marginTop: 6}} >Event Organizer:</Text>
                                <Text style={{  marginHorizontal: 6}} >{this.props.userSelectedEvent.eventOrganizer.name}</Text>
                                <Thumbnail  square style={{width: 30, height: 30, marginLeft: 6}} source={{uri: this.props.userSelectedEvent.eventOrganizer.picture}} />
                                <Text></Text>
                                <Text style={{fontFamily: 'Bungee-Regular',  marginHorizontal: 6}} >Participants:</Text>
                                {attendees}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer style={{backgroundColor: 'rgb(245, 203, 92)', borderColor: 'rgb(51,53,51)', borderTopWidth: 2, borderStyle: 'solid', position: 'absolute', bottom: 0 }} >
                    <FooterTab>
                        <Button transparent onPress={() => { this.joinEvent(); this.cancelViewEvent()}} >
                            <Icon style={{color: 'black'}} name='checkbox' />
                            <Text style={{color: 'black', fontFamily: 'Bungee-Regular', fontSize: 12}}>Join Event</Text>
                        </Button>
                    </FooterTab>
                    <FooterTab style={{borderLeftColor: 'black', borderLeftWidth: 1, borderStyle: 'solid'}}>
                        <Button transparent button onPress={() => { this.eventChatView()}} >
                            <Icon style={{color: 'black'}} name="ios-chatbubbles" />
                            <Text style={{color: 'black', fontFamily: 'Bungee-Regular', fontSize: 12}}>Event Chat</Text>
                        </Button>
                    </FooterTab>
                </Footer>    
            </View>        
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

