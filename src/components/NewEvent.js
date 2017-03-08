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
    }

    cancelNewEvent() {       
        this.props.dispatch(actions.renderNewEventView());       
    }

    setTitle(title) {
        console.log('INPUT USERNAME', title)
    }

    onDateChange = (startTime) => {
        var endTime = startTime;
        endTime.setHours(endTime.getHours() + this.props.userSelectedEventDuration);
        console.log('THIS IS START TIME ' , startTime);
        console.log('AND THIS IS ENDTIME ', endTime);
        this.props.dispatch(actions.userSelectedEventStartTime(startTime));
        this.props.dispatch(actions.userSelectedEventEndTime(endTime));
  };


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

                                <DatePickerIOS
                                    date={this.props.userSelectedEventStartTime}
                                    mode="time"
                                    onDateChange={this.onDateChange}
                                    timeZoneOffsetInMinutes={0 * 60}
                                    minuteInterval={10}
                                />
                </Content>
            </Container>
        );
    }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D9D9D9'
//   },
 
//   picker: {
//     backgroundColor: '#E5E5E5'
//   }
// });


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