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
        console.log('INPUT USERNAME', title)
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
                            <Input  onChangeText={(title) => {this.setTitle(title); }}/>
                        </Item>
                        <Item>
                            <View>

                            </View>
                        </Item>
                    </Form>
                    <View>
                        <DatePickerIOS
                            date={this.props.userSelectedEventStartTime}
                            mode="time"
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
    userSelectedEventDuration: state.userSelectedEventDuration
});


export default connect(mapStateToProps)(NewEvent);