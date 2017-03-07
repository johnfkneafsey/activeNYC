
import React, { Component } from 'react';
import { Image, View, ScrollView } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
var moment = require('moment');
// import Icon from 'react-native-vector-icons/FontAwesome';

import CalendarStrip from 'react-native-calendar-strip';

export class EventsMain extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventsView = this.renderEventsView.bind(this);
        this.facilityTypeView = this.facilityTypeView.bind(this);
        this.selectedDate = this.selectedDate.bind(this);
        this.addEvent = this.addEvent.bind(this);       
    }

    renderEventsView() {
        this.props.dispatch(actions.renderEventsView());
    }

    facilityTypeView() {
        this.props.dispatch(actions.facilityTypeView());
    }

    selectedDate(e) {
        console.log('SELECTED DATE', moment(e).format().slice(0, moment(e).format().indexOf('T')));
        let selectedDate = moment(e).format().slice(0, moment(e).format().indexOf('T'));
        this.props.dispatch(actions.selectedDate(selectedDate))
    }

    addEvent() {
        console.log('add event triggered')
        
    }


    render() {

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

        let events = this.props.globalEventsFAKE.map(event => {

        return (
                <Card key={event.eventName}>
                    <CardItem>
                        <Left>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Title>{event.eventTime}</Title>
                                <Text>{event.eventName}</Text>
                                <Text></Text>

                                    <Thumbnail circle source={{uri: "https://unsplash.it/40/40/?random"}} />
                                    <Text>{event.eventOrganizerName}</Text>
                    
    
                            

                            </View>
                        </Left>
                        <Right>
                            <View style={{flex: 1, flexDirection: 'column'}}>
                                <Button transparent onPress={() => { this.addEvent()}}>
                                    <Icon name='ios-person-add' />
                                    <Text>Join Event</Text>   
                                </Button>  
                                <Button transparent onPress={() => { this.addEvent()}}>
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

                        
                        {/*<Body>
                        <Thumbnail style={{width: 240, height: 132}} square source={{uri: "https://unsplash.it/200/300/?random"}} />
                            <Title>{facility.Name}</Title>
                            <Text>{facility.Location}</Text>
                            <Text>{facility.Prop_ID}</Text>
                            <Text>Prop_ID: {facility.Location}</Text>
                            <Text>Latitude: {facility.lat}</Text>
                            <Text>Longitude: {facility.lon}</Text>
                            <Text>DistanceVariance: {facility.locationVariance}</Text>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                            <Button button onPress={() => { this.renderEventsView()}}>
                                <Icon name="ios-people" />
                            </Button>
                            <Button button onPress={() => { this.selectFacilityandViewMap(facility)}}>
                                <Icon name="ios-map" />
                            </Button>
                            <Button>
                                <Icon name='ios-information-circle' />
                            </Button>   
                            </View>               
                        </Body>*/}

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
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: "https://unsplash.it/40/40/?random"}} />
                                    </Left>
                                    <Body>
                                        <Text>{item.Name}</Text>
                                        <Text note>{item.Location}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{  width: 50, flex: 1, height: 200 }} source={{uri: "https://unsplash.it/200/300/?random"}} />
                                </CardItem>
                                <CardItem>
                                    <Left>
                                            <Icon name={typeIcon} style={{ color: '#ED4A6A' }} />
                                            <Text>Events</Text>
                                    </Left>
                                    <Right>
                                        <Button transparent onPress={() => { this.addEvent()}}>
                                            <Icon name='ios-add-circle' />
                                            <Text>Add Event</Text>
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
                                        onDateSelected={this.selectedDate}
                                    />
                                <ScrollView>
                                    {events}
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
    globalEventsFAKE: state.globalEventsFAKE
});


export default connect(mapStateToProps)(EventsMain);