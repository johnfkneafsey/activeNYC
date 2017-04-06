
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
var moment = require('moment');
import CalendarStrip from 'react-native-calendar-strip';
import { Image } from '@shoutem/ui';

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
        console.log('PREV PROPS', prevProps)
        console.log('PREV STATE', prevState)
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
        console.log('EVENT E', moment(e)._d)
        let selectedDate = moment(e)._d;
        this.props.dispatch(actions.selectedDate(selectedDate))
    }

    renderNewEventView() {
        console.log('add event triggered')
        this.props.dispatch(actions.renderNewEventView());
    }

    renderViewEventView(event) {
        console.log('are we here yet. here is event', event)
        let selectedEvent;
        for (i = 0; i < this.props.events.length; i ++) {
            if (this.props.events[i].eventName === event) {
                this.props.dispatch(actions.renderViewEventView(this.props.events[i]));
            }
        }
    }

    passUpFacilityName(facility) {
        console.log('FACILITY ', facility)
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
        console.log(formattedTime)
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
        let size = "height300"
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
            
            return (
                <Card key={event.eventName} style={{backgroundColor: 'rgb(245, 203, 92)'}}>
                    <CardItem style={{backgroundColor: 'rgb(245, 203, 92)'}} >
                        <Left>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Title>{event.eventName}</Title>
                                <Text>{this.getFormattedDate(event)}</Text>
                                <Text>{this.getFormattedTime(event)}</Text>                                
                                <Text>{event.eventDuration} hour</Text>
                                <Text>{event.eventDescription}</Text>
                                <Text></Text>
                                    <Thumbnail circle source={{uri: event.eventOrganizer.picture}} />
                                    <Text>{event.eventOrganizer.name}</Text>
                            </View>
                        </Left>
                        <Right>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Button transparent onPress={() => { this.renderViewEventView(event.eventName)}}>
                                    <Icon name='ios-information-circle' />
                                    <Text>View Event</Text>
                                </Button>  
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    {attendees}
                                </View>  
                                    <Text>and {event.eventParticipants} others... </Text>
                            </View>                                     
                        </Right>
                    </CardItem>
                </Card>
            )
        })

        return (
            <Container style={{backgroundColor: 'rgb(51,53,51)'}} >
                <Header style={{backgroundColor: 'rgb(245, 203, 92)'}} > 
                    <Left>
                        <Button transparent onPress={() => { this.facilityTypeView()}}>
                            <Icon style={{color: 'rgb(48,188,237)'}} name='arrow-back' />
                            <Text></Text>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color: 'rgb(51,53,51)', fontFamily: 'Bungee-Regular', fontSize: 18}} >{displayTitle}</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.renderEventsView()}} >
                            <Icon style={{color: 'rgb(48,188,237)'}} name="ios-map" />
                        </Button>
                    </Right>
                </Header>     

                <DeckSwiper
                    dataSource={this.props.markers}
                    onSwipeLeft={this.swipe}
                    onSwipeRight={this.swipe}
                    renderItem={item =>
                        <Card key={item.Name} style={{ elevation: 3, backgroundColor: 'rgb(51,53,51)', paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0}}>
                            <CardItem style={{ backgroundColor: 'rgb(51,53,51)'}} >
                                <Body style={{ backgroundColor: 'rgb(51,53,51)', flex: .1, alignItems: 'center', justifyContent: 'center'}}>
                                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                                        <Image styleName='medium-wide rounded-corners' source={{uri: photoURL}} />
                                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular',}} >{item.Name}</Text>                                                           
                                        <Button transparent onPress={() => { this.renderNewEventView()}}>
                                            <Icon style={{ color: 'rgb(48,188,237)'}} name='ios-add-circle' />
                                            <Text style={{ color: 'rgb(245, 203, 92)'}}>Create New Event</Text>
                                        </Button>                                 
                                        <View style={{ alignItems: 'center', justifyContent: 'center'}} >                            
                                            <Text style={{ color: 'rgb(245, 203, 92)'}}>What's happening?</Text>
                                        </View>                                         
                                    </View>
                                </Body>
                            </CardItem>
                        
                            <CalendarStrip
                                calendarAnimation={{type: 'sequence', duration: 30}}
                                selection={'border'}
                                selectionAnimation={{duration: 300, borderWidth: 1}}
                                style={{paddingTop: 20, paddingBottom: 10}}
                                calendarHeaderStyle={{color: 'rgb(51,53,51)'}}
                                calendarColor={'rgb(245, 203, 92)'}
                                highlightColor={'rgb(51,53,51)'}
                                dateNumberStyle={{color: 'white'}}
                                dateNameStyle={{color: 'white'}}
                                borderHighlightColor={'rgb(51,53,51)'}
                                iconContainer={{flex: 0.1}}
                                onDateSelected={ () => {this.selectedDate(); }}
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