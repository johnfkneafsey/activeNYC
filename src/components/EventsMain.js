
import React, { Component } from 'react';
import { Image, View, ScrollView } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
var moment = require('moment');
import CalendarStrip from 'react-native-calendar-strip';

export class EventsMain extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventsView = this.renderEventsView.bind(this);
        this.facilityTypeView = this.facilityTypeView.bind(this);
        this.selectedDate = this.selectedDate.bind(this);
        this.renderNewEventView = this.renderNewEventView.bind(this);    
        this.renderViewEventView = this.renderViewEventView.bind(this); 
        this.passUpFacilityName = this.passUpFacilityName.bind(this);
        this.swipe = this.swipe.bind(this)
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
        console.log('SELECTED DATE', moment(e).format().slice(0, moment(e).format().indexOf('T')));
        let selectedDate = moment(e).format().slice(0, moment(e).format().indexOf('T'));
        this.props.dispatch(actions.selectedDate(selectedDate))
    }

    renderNewEventView() {
        console.log('add event triggered')
        this.props.dispatch(actions.renderNewEventView());
    }

    renderViewEventView(event) {
        console.log('are we here yet. here is event', event)
        let selectedEvent;
        for (i = 0; i < this.props.globalEventsFAKE.length; i ++) {
            console.log('are we iterating')
            if (this.props.globalEventsFAKE[i].eventName === event) {
                console.log('are we true?')
                this.props.dispatch(actions.renderViewEventView(this.props.globalEventsFAKE[i]));
            }
        }
    }

    passUpFacilityName (facility) {
        console.log('FACILITY ', facility)
        this.props.dispatch(actions.currentCard(facility))
    }


    // getFacilityPicture (facility) {
    //     // let paramsVenues = {
    //     //     "ll": facility.lat + "," + facility.lon,
    //     //     "query": facility.Name,
    //     //     "venuePhotos": 1
    //     // };
        
    //     // this.props.dispatch(actions.asyncSaveVenueToStore(paramsVenues))

    // }


    swipe () {
        if (this.props.markers.length === this.props.currentCardIndex) {
            this.props.dispatch(actions.setCurrentCardIndexToZero())
        } else {
            this.props.dispatch(actions.incrementCurrentCardIndex())
        }
    }


    render() {


    
        let facilityThumbnail =  <View></View>  

        let prefix = this.props.selectedVenue.featuredPhotos.items[0].prefix;
        let suffix = this.props.selectedVenue.featuredPhotos.items[0].suffix;
        let size = "height300"
        let photoURL = prefix + size + suffix;

        facilityThumbnail = <Thumbnail source={{uri: photoURL}} />
            
        

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

            let name = event.eventName
            
            return (
                    <Card key={event.eventName}>
                        <CardItem>
                            <Left>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Title>{event.eventTime}</Title>
                                    <Text>{event.eventName}</Text>
                                    <Text></Text>

                                        <Thumbnail circle source={{uri: event.eventOrganizer.picture}} />
                                        <Text>{event.eventOrganizer.name}</Text>
                                </View>
                            </Left>
                            <Right>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Button transparent onPress={() => { this.addEvent()}}>
                                        <Icon name='ios-person-add' />
                                        <Text>Join Event</Text>   
                                    </Button>  
                                    <Button transparent onPress={() => { this.renderViewEventView(name)}}>
                                        <Icon name='ios-information-circle' />
                                        <Text>  Info and Chat</Text>
                                    </Button>  
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Thumbnail  circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: "https://unsplash.it/40/40/?random"}} />
                                        <Thumbnail  circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: "https://unsplash.it/40/40/?random"}} />
                                        <Thumbnail  circle style={{width: 30, height: 30, borderRadius: 10}} source={{uri: "https://unsplash.it/40/40/?random"}} />
                                    </View>  
                                        <Text>and {event.eventParticipants} others... </Text>
                                </View>                                     
                            </Right>
                        </CardItem>
                    </Card>
            )
        })

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { this.facilityTypeView()}}>
                            <Icon name='arrow-back' />
                            <Text></Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{displayTitle}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.renderEventsView()}} >
                            <Icon name="ios-map" />
                        </Button>
                    </Right>
                </Header>               
                <View>
                    <DeckSwiper
                        dataSource={this.props.markers}
                        onSwipeLeft={this.swipe}
                        onSwipeRight={this.swipe}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        {facilityThumbnail}
                                    </Left>
                                    <Body>
                                        <Text>{item.Name}</Text>
                                        <Text note>{item.Location}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{  width: 50, flex: 1, height: 100 }} source={{uri: "https://unsplash.it/200/200/?random"}} />
                                </CardItem>
                                <CardItem>
                                    <Left>
                                            <Icon name={typeIcon} style={{ color: '#ED4A6A' }} />
                                            <Text>What's happening?</Text>
                                    </Left>
                                    <Right>
                                        <Button transparent onPress={() => { this.renderNewEventView()}}>
                                            <Icon name='ios-add-circle' />
                                            <Text>New Event</Text>
                                        </Button>                                        
                                    </Right>
                                </CardItem>
                                <View>
                                    <CalendarStrip
                                        calendarAnimation={{type: 'sequence', duration: 30}}
                                        selection={'border'}
                                        selectionAnimation={{duration: 300, borderWidth: 1}}
                                        style={{paddingTop: 20, paddingBottom: 10}}
                                        calendarHeaderStyle={{color: 'white'}}
                                        calendarColor={'#7743CE'}
                                        highlightColor={'#9265DC'}
                                        dateNumberStyle={{color: 'white'}}
                                        dateNameStyle={{color: 'white'}}
                                        borderHighlightColor={'white'}
                                        iconContainer={{flex: 0.1}}
                                        onDateSelected={ () => {this.selectedDate(); this.passUpFacilityName(item)}}
                                    />
                                    <ScrollView>
                                        {eventList}
                                    </ScrollView>
                                </View>
                            </Card>
                        }
                    />
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
    globalEventsFAKE: state.globalEventsFAKE,
    events: state.events,
    currentCard: state.currentCard,
    selectedVenue: state.selectedVenue,
    currentCardIndex: state.currentCardIndex
});


export default connect(mapStateToProps)(EventsMain);