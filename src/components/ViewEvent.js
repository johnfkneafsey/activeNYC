import React, { Component } from 'react';
import {  DatePickerIOS, View, ScrollView, StyleSheet, Linking, ListView } from 'react-native';
import { Container, Content, Form, Item, Input, Thumbnail, Label, Header, Left, Right, Button, Icon, Body, Title, Text, Footer, FooterTab} from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import {TouchableOpacity, Card, Image, Subtitle, GridRow } from '@shoutem/ui';


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


    renderRow(rowData, sectionId, index) {     


        const cellViews = rowData.map((attendee, id) => {
            return (
                <TouchableOpacity key={id} styleName="flexible">
                    <Card styleName="flexible">
                        <Image
                        styleName="small"
                        source={{uri: attendee.picture}}
                        />
                        <View styleName="content">
                        <Subtitle numberOfLines={3}>{attendee.name}</Subtitle>
                        <View styleName="horizontal">
                            <Button style={{color: 'white', fontFamily: 'Brother1816Printed-Regular', fontSize: 12, backgroundColor: 'rgb(59,89,152)', height: 30, width: 85}}
                                onPress={() => Linking.openURL(attendee.link)}>
                                <Text style={{color: 'white'}}>Profile</Text>
                            </Button>  
                        </View>
                        </View>
                    </Card>
                </TouchableOpacity>
                );
            });
        return (
        <GridRow columns={2}>
            {cellViews}
        </GridRow>
        );
    }

    render() {

        let hrs = 'hour';
        if (this.props.userSelectedEventDuration > 1) {
            hrs = 'hours'
        }
        let attendeeKey = 0;
        let attendees = this.props.userSelectedEvent.eventAttendees.map(attendee => {
            attendeeKey += 1;
            return (
                <View key={attendeeKey} style={{marginHorizontal: 6, marginTop: 4, flexDirection: 'row'}}>
                    <Thumbnail square source={{uri: attendee.picture}} style={{marginRight: 5}}/>                
                    <Text style={{fontFamily: 'Brother1816Printed-Regular', marginRight: 5}} >{attendee.name} </Text>
                    <Button style={{color: 'white', fontFamily: 'Brother1816Printed-Regular', fontSize: 12, backgroundColor: 'rgb(59,89,152)', height: 30, width: 85}}
                        onPress={() => Linking.openURL(attendee.link)}>
                        <Text style={{color: 'white'}}>Profile</Text>
                    </Button>                    
                </View>
            )
        })

        const groupedData = GridRow.groupByRows(this.props.userSelectedEvent.eventAttendees, 2, () => {
            return 1;
        });


        return (
            <View style={{flex: 1}} > 
                    <Header style={{backgroundColor: 'black', borderBottomColor: 'rgb(245, 203, 92)', borderBottomWidth: 2, borderBottomStyle: 'solid' }} > 
                        <Left>
                            <Button transparent onPress={() => { this.cancelViewEvent()}} >
                                <Icon style={{color: 'rgb(245, 203, 92)'}} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >VIEW EVENT</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>                
                <ScrollView style={{backgroundColor: 'rgb(51,53,51)'}} >
                    <Text></Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', }}>
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >What</Text>                        
                        <View style={{height: 150, width: 380, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6, borderWidth: 2, borderColor: 'black'}}>
                            <Text style={{fontFamily: 'Brother1816Printed-Black', marginHorizontal: 6, marginTop: 6}} >Event Name:</Text>
                            <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}} >{this.props.userSelectedEvent.eventName}</Text>
                            <Text></Text>
                            <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Black'}} >Description:</Text>
                            <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}}>{this.props.userSelectedEvent.eventDescription}</Text>
                        </View> 
                        <Text></Text>                   
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column', alignItems: 'center', }}>
                                <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18 }} >When</Text>                        
                                <View style={{height: 160, width: 180, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6, borderWidth: 2, borderColor: 'black'}}>
                                    <Text style={{ fontFamily: 'Brother1816Printed-Black',  marginHorizontal: 6, marginTop: 6}} >Date:</Text>
                                    <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}} >{this.getFormattedDate()}</Text>
                                    <Text></Text>
                                    <Text style={{fontFamily: 'Brother1816Printed-Black',  marginHorizontal: 6}} >Time:</Text>
                                    <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}} >{this.getFormattedTime()}</Text>
                                    <Text></Text>
                                    <Text style={{fontFamily: 'Brother1816Printed-Black',  marginHorizontal: 6}} >Duration:</Text>
                                    <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}}>{this.props.userSelectedEvent.eventDuration} {hrs}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'center', }}>                        
                                <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >Where</Text>                        
                                <View style={{height: 160, width: 180, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6, borderWidth: 2, borderColor: 'black'}}>
                                    <Text style={{fontFamily: 'Brother1816Printed-Black',  marginHorizontal: 6, marginTop: 6}} >Facility:</Text>
                                    <Text style={{ marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}} >{this.props.userSelectedEvent.eventFacilityName}</Text>
                                    <Text></Text>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}} >
                                        <Button transparent style={{backgroundColor: 'black', marginLeft: 35}} onPress={() => { this.navigateToFacility('http://maps.apple.com/?saddr=' + this.props.userLatitude + ',' + this.props.userLongitude + '&daddr=' + + this.props.selectedFacility.lat + ',' + this.props.selectedFacility.lon)}}>
                                            <Icon style={{color: 'rgb(245, 203, 92)'}} name="ios-walk-outline" />
                                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 12, }}>Show me</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <Text></Text>                    
                        <View style={{flexDirection: 'column', alignItems: 'center', }}>                    
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >Who</Text>                    
                            <View style={{height: 600, width: 380, backgroundColor: 'rgb(245, 203, 92)', marginVertical: 10, marginHorizontal: 10, alignItems: 'flex-start', borderRadius: 6, borderTopLeftRadius: 6, borderWidth: 2, borderColor: 'black'}}>
                                <Text style={{ fontFamily: 'Brother1816Printed-Black',  marginHorizontal: 6, marginTop: 6}} >Event Organizer:</Text>
                                <View style={{flexDirection: 'row', marginTop: 4}}>                        
                                    <Thumbnail  square style={{ marginLeft: 6}} source={{uri: this.props.userSelectedEvent.eventOrganizer.picture}} />
                                    <Text style={{  marginHorizontal: 6, fontFamily: 'Brother1816Printed-Regular'}} >{this.props.userSelectedEvent.eventOrganizer.name}</Text>
                                    <Button style={{color: 'white', fontFamily: 'Brother1816Printed-Regular', fontSize: 12, backgroundColor: 'rgb(59,89,152)', height: 30, width: 85}}
                                        onPress={() => Linking.openURL(this.props.userSelectedEvent.eventOrganizer.link)}>
                                        <Text style={{color: 'white'}}>Profile</Text>
                                    </Button>  
                                </View>
                                <Text></Text>
                                <Text style={{fontFamily: 'Brother1816Printed-Black',  marginHorizontal: 6}} >Participants:</Text>
                                {attendees}
                                {/*<ListView
                                    data={groupedData}
                                    renderRow={this.renderRow}
                                />*/}
                            </View>
                        </View>

                    </View>
                </ScrollView>
                <Footer style={{backgroundColor: 'black', borderColor: 'rgb(245, 203, 92)', borderTopWidth: 2, borderStyle: 'solid', position: 'absolute', bottom: 0 }} >
                    <FooterTab>
                        <Button transparent onPress={() => { this.joinEvent(); this.cancelViewEvent()}} >
                            <Icon style={{color: 'rgb(245, 203, 92)'}} name='checkbox' />
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 12}}>Join Event</Text>
                        </Button>
                    </FooterTab>
                    <FooterTab style={{borderLeftColor: 'black', borderLeftWidth: 1, borderStyle: 'solid'}}>
                        <Button transparent button onPress={() => { this.eventChatView()}} >
                            <Icon style={{color: 'rgb(245, 203, 92)'}} name="ios-chatbubbles" />
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 12}}>Event Chat</Text>
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

