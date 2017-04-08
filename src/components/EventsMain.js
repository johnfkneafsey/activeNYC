
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
var moment = require('moment');
import CalendarStrip from 'react-native-calendar-strip';
import { Image, Overlay, Tile, Subtitle } from '@shoutem/ui';

export class EventsMain extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventsView = this.renderEventsView.bind(this);
        this.facilityTypeView = this.facilityTypeView.bind(this);
        this.selectedDate = this.selectedDate.bind(this);
        this.renderNewEventView = this.renderNewEventView.bind(this);    
        this.renderViewEventView = this.renderViewEventView.bind(this); 
        this.passUpFacilityName = this.passUpFacilityName.bind(this);
        this.swipe = this.swipe.bind(this);
    }

    componentDidMount () {
        let cardIndex = this.props.currentCardIndex;
        let paramsVenues = {
            "ll": this.props.markers[cardIndex].lat + "," + this.props.markers[cardIndex].lon,
            "query": this.props.markers[cardIndex].Name,
            "venuePhotos": 1
        };
        this.props.dispatch(actions.asyncSaveVenueToStore(paramsVenues))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedVenue === this.props.selectedVenue) {
            let cardIndex = this.props.currentCardIndex;
            let paramsVenues = {
                "ll": this.props.markers[cardIndex].lat + "," + this.props.markers[cardIndex].lon,
                "query": this.props.markers[cardIndex].Name,
                "venuePhotos": 1
            };
            this.props.dispatch(actions.asyncSaveVenueToStore(paramsVenues))
        }
    }

    renderEventsView() {
        this.props.dispatch(actions.renderEventsView());
    }

    facilityTypeView() {
        this.props.dispatch(actions.facilityTypeView());
        this.props.dispatch(actions.renderEventsView());
    }

    selectedDate(e) {
        let selectedDate = moment(e)._d;
        this.props.dispatch(actions.selectedDate(selectedDate))
    }

    renderNewEventView() {
        this.props.dispatch(actions.renderNewEventView());
    }

    renderViewEventView(event) {
        let selectedEvent;
        for (i = 0; i < this.props.events.length; i ++) {
            if (this.props.events[i].eventName === event) {
                this.props.dispatch(actions.renderViewEventView(this.props.events[i]));
            }
        }
    }

    passUpFacilityName(facility) {
        this.props.dispatch(actions.currentCard(facility))
    }

    swipe() {
        if (this.props.markers.length === this.props.currentCardIndex) {
            this.props.dispatch(actions.setCurrentCardIndexToZero())
        } else {
            this.props.dispatch(actions.incrementCurrentCardIndex())
        }
    }

    getFormattedTime(event) {
        let dateObj = new Date(Date.parse(event.eventStartTime));
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

    getFormattedDate(event) {
       let dateObj = new Date(Date.parse(event.eventStartTime));
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

    render() {

        let prefix = this.props.selectedVenue.featuredPhotos.items[0].prefix;
        let suffix = this.props.selectedVenue.featuredPhotos.items[0].suffix;
        let size = "height500"
        let photoURL = prefix + size + suffix;
        const nameObj = {
            basketball: "Basketball",
            soccerAndFootball: "Soccer",
            runningtracks: "Tracks",
            pools_indoor: "Swimming",
            tennis: "Tennis",
            bocce: "Bocce",
            cricket: "Cricket",
            handball: "Handball",
            kayak: "Kayak and Canoe ",
            iceskating: "Ice Skating"
        }      
        
        let displayTitle = nameObj[this.props.parkType];
        let typeIcon = this.props.icons[this.props.parkType];
        
        let eventList = this.props.events.map(event => {
            let attendees = event.eventAttendees.map(attendee => {
                return (
                    <Thumbnail  key={event.first_name} circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: attendee.picture}} />  
                )
            })

            let hrs = 'hour';
            if (event.eventDuration > 1) {
                hrs = 'hours'
            }
            
            return (
                <Card key={event.eventName} style={{backgroundColor: 'rgb(245, 203, 92)', marginLeft: 10, marginRight: 10}} >
                    <Text style={{fontFamily: 'Bungee-Regular', marginTop: 5, alignSelf: 'center', }}>{event.eventName}</Text> 
                    <Text></Text>
                    <View style={{flexDirection: 'row'}} >                       
                        <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start'}}>                          
                            {/*<Text>{this.getFormattedDate(event)}</Text>*/}
                            <Text style={{marginLeft: 5, }} ><Text style={{fontWeight: 'bold'}} >Time:</Text> {this.getFormattedTime(event)}</Text> 
                            <Text></Text>                               
                            <Text style={{marginLeft: 5, }} ><Text style={{fontWeight: 'bold'}} >Duration:</Text> {event.eventDuration} {hrs}</Text>
                            <Text></Text>
                            <Text style={{fontWeight: 'bold', marginLeft: 5}}>Attendees: {event.eventAttendees.length + 1}</Text>
                            <Text></Text>
                            <Text style={{marginLeft: 5, fontWeight: 'bold'}} >Description</Text>
                            <Text style={{marginLeft: 5, marginBottom: 10 }} >{event.eventDescription}</Text>                          
                        </View>                                           
                        <View style={{flex: .6, flexDirection: 'column', alignItems: 'flex-end'}}>
                            <Text style={{fontWeight: 'bold', marginRight: 5}}>Event Organizer</Text>
                            <Thumbnail square style={{marginRight: 25}} source={{uri: event.eventOrganizer.picture}} />
                            <Text style={{marginRight: 5}}>{event.eventOrganizer.name}</Text>
                            <Text></Text>
                            <View style={{marginRight: 5, }}>
                                <Button style={{backgroundColor: 'rgb(51,53,51)', height: 30, width: 165, }} onPress={() => { this.renderViewEventView(event.eventName)}}>
                                    <Icon style={{color: 'rgb(245, 203, 92)', }} name='ios-information-circle' />
                                    <Text style={{fontFamily: 'Bungee-Regular', color: 'rgb(245, 203, 92)', }} >View Event</Text>
                                </Button>           
                            </View>                  
                        </View>  
                    </View>                 
                </Card>
            )
        })

        return (
            <Container style={{backgroundColor: 'rgb(51,53,51)'}} >
                <Header style={{backgroundColor: 'rgb(51,53,51)', borderBottomColor: 'rgb(245, 203, 92)', borderBottomWidth: 2, borderBottomStyle: 'solid' }} > 
                    <Left>
                        <Button transparent onPress={() => { this.facilityTypeView()}}>
                            <Icon style={{color: 'rgb(245, 203, 92)'}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', fontSize: 18}} >{displayTitle}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.renderEventsView()}} >
                            <Icon style={{color: 'rgb(245, 203, 92)'}} name="ios-map" />
                        </Button>
                    </Right>
                </Header>     
                <DeckSwiper
                    dataSource={this.props.markers}
                    onSwipeLeft={this.swipe}
                    onSwipeRight={this.swipe}
                    renderItem={item =>
                        <Card key={item.Name} style={{ elevation: 3, backgroundColor: 'rgb(51,53,51)', paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
                            
                            <Image styleName='large-banner' source={{uri: photoURL}} >
                                <Tile style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
                                    <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', fontSize: 24}} >{item.Name}</Text>
                                    <View style={{position: 'absolute', bottom: 2, justifyContent: 'center',}}>
                                        <Button rounded style={{   width: 220, height: 30, backgroundColor: 'rgb(51,53,51)'}} onPress={() => { this.renderNewEventView()}}>
                                            <Icon style={{ color: 'rgb(245, 203, 92)'}} name='ios-add-circle' />
                                            <Text style={{ color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular'}}>Create New Event</Text>
                                        </Button>  
                                    </View>     
                                </Tile>
                            </Image>
                            <CalendarStrip
                                calendarAnimation={{type: 'sequence', duration: 30}}
                                daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'rgb(245, 203, 92)'}}
                                selection={'border'}
                                selectionAnimation={{duration: 300, borderWidth: 1}}
                                style={{paddingTop: 20, paddingBottom: 10, borderColor: 'rgb(245, 203, 92)', borderStyle: 'solid', borderTopWidth: 2, borderBottomWidth: 2}}
                                calendarHeaderStyle={{color: 'rgb(245, 203, 92)'}}
                                calendarColor={'rgb(51,53,51)'}
                                highlightColor={'rgb(245, 203, 92)'}
                                dateNumberStyle={{color: 'rgb(245, 203, 92)'}}
                                dateNameStyle={{color: 'rgb(245, 203, 92)'}}
                                borderHighlightColor={'rgb(245, 203, 92)'}
                                highlightDateNumberStyle={{color: 'rgb(245, 203, 92)'}}
                                highlightDateNameStyle={{color: 'rgb(245, 203, 92)'}}
                                iconLeftStyle={{backgroundColor: 'rgb(245, 203, 92)', color: 'rgb(245, 203, 92)', borderWidth: 3, borderColor: 'rgb(245, 203, 92)', borderRadius: 6, borderStyle: 'solid', marginLeft: 3}}
                                iconRightStyle={{backgroundColor: 'rgb(245, 203, 92)', color: 'rgb(245, 203, 92)', borderWidth: 3, borderColor: 'rgb(245, 203, 92)', borderRadius: 6, borderStyle: 'solid', marginRight: 7}}
                            />
                            <ScrollView>
                                {eventList}
                            </ScrollView>                     
                        </Card>
                    }
                />      
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
    events: state.events,
    currentCard: state.currentCard,
    selectedVenue: state.selectedVenue,
    currentCardIndex: state.currentCardIndex
});


export default connect(mapStateToProps)(EventsMain);