import React, { Component } from 'react';
import { Image, DatePickerIOS, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Item, Header, Left, Right, Icon, Body, Title, Text, Input, Label, Button, Form, FormGroup, Footer, FooterTab} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
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
        this.props.dispatch(actions.userSelectedEventTitle(title));
    }

    setDescription(description) {
        this.props.dispatch(actions.userSelectedEventDescription(description));
    }

    onDateChange = (startTime) => {
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
        this.props.dispatch(actions.createEvent(eventObj));
        this.props.dispatch(actions.loadEvents());
        this.props.dispatch(actions.renderNewEventView());
    }

    render() {

        let hourModifier = 'hour';

        if (this.props.userSelectedEventDuration > 1) {
            hourModifier = 'hours';
        }        

        return (
            <Container style={{backgroundColor: 'rgb(51,53,51)',  }}> 
                <Header style={{backgroundColor: 'black', borderBottomColor: 'rgb(245, 203, 92)', borderBottomWidth: 2, borderBottomStyle: 'solid' }}>
                    <Left>
                        <Button transparent onPress={() => { this.cancelNewEvent()}} >
                            <Icon style={{color: 'rgb(245, 203, 92)'}} name='arrow-back' />
                            <Text></Text>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >CREATE</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>    
                <View style={{flexDirection: 'column', marginHorizontal: 20,}} >
                    <Sae
                        label={'Event Title'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'rgb(245, 203, 92)'}  
                        labelStyle={{ color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black' }}  
                        inputStyle={{ color: 'rgb(245, 203, 92)' }}                    
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(title) => {this.setTitle(title); }}
                    />
                    <Text></Text>
                    <Sae
                        label={'Description'}
                        iconClass={FontAwesomeIcon}
                        iconName={'pencil'}
                        iconColor={'rgb(245, 203, 92)'}              
                        labelStyle={{ color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black' }}  
                        inputStyle={{ color: 'rgb(245, 203, 92)',  }}        
                        // TextInput props
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(description) => {this.setDescription(description); }}
                    />
                    <View style={{marginTop: 20, marginBottom: 20, padding: 20}} ></View>
                    <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >Date and Time</Text>
                    <View style={{backgroundColor: 'rgb(245, 203, 92)', paddingHrizontal: 8, borderRadius: 6, borderColor: 'black', borderWidth: 2, borderStyle: 'solid',  justifyContent: 'center'}} >
                        <DatePickerIOS
                            date={this.props.userSelectedEventStartTime}
                            mode="datetime"
                            onDateChange={this.onDateChange}
                            minuteInterval={10}
                        />
                    </View>
                    <Text></Text>   
                    <View style={{flexDirection: 'column', alignItems: 'center'}} >
                        <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', fontSize: 18}} >Duration</Text>
                        <Text></Text>
                        <View style={{flexDirection: "row" ,justifyContent: 'center', alignItems: 'center' }}>
                            <Button iconLeft style={{backgroundColor: 'rgb(245, 203, 92)', borderWidth: 2, borderColor: 'black'}} onPress={() => { this.subtractHour() }}>
                                <Icon style={{color: 'black'}} name='arrow-back' />
                            </Button>
                            <Text  style={{color: 'rgb(245, 203, 92)', justifyContent: 'center', alignItems: 'center', marginLeft: 15, marginRight: 15, fontFamily: 'Brother1816Printed-Black'}} >{this.props.userSelectedEventDuration} {hourModifier} </Text> 
                            <Button iconRight style={{backgroundColor: 'rgb(245, 203, 92)', borderWidth: 2, borderColor: 'black'}}  onPress={() => { this.addHour() }}>      
                                <Icon style={{color: 'black'}} name='arrow-forward' />
                            </Button>                   
                        </View>                    
                    </View>
                </View>
                <Footer style={{backgroundColor: 'black', borderColor: 'rgb(245, 203, 92)', borderTopWidth: 2, borderStyle: 'solid', position: 'absolute', bottom: 0 }} >
                    <FooterTab>
                        <Button transparent style={{ backgroundColor: 'black'}} onPress={() => { this.createEvent()}}>
                            <Icon style={{color:  'rgb(245, 203, 92)'}}  name='checkbox' />
                            <Text style={{color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black'}} >Submit</Text>
                        </Button>
                    </FooterTab>
                </Footer>                  
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