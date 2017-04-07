import React, { Component } from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';

export class EventChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderEventChatView = this.renderEventChatView.bind(this);  
  }

  componentWillMount() {
    this.props.dispatch(actions.loadEvents());

    this.setState({
      messages: [
          {
            _id: 2,
            text: 'Hello developer. TEST MESSAGE NUMBER 2 PLEAS RENDER',
            createdAt: new Date(Date.UTC(2016, 8, 30, 17, 20, 0)),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          },        
          {
            _id: 1,
            text: 'Hello developer. This is a test message',
            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: "https://scontent.xx.fbcdn.net/v/t1.0-1/c50.50.621.621/s50x50/301465_10151167409319894_1550737101_n.jpg?oh=afbb3550ddd89bd5e1e5de2d02768698&oe=596C0D2E",
            },
          },


        ],
    });
  }

  renderEventChatView() {
    this.props.dispatch(actions.renderEventChatView());
  }

  onSend(messages = []) {
    this.props.dispatch(actions.asyncPutMessage(messages, this.props.userSelectedEvent.eventStartTime))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
        </View>
      );
    }
    return null;
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
  
    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
              <Title>{displayTitle}</Title>
          </Body>
          <Right>
              <Button transparent onPress={() => { this.renderEventChatView()}} >
                <Icon name="ios-backspace" />
              </Button>
          </Right>
        </Header>  
        <GiftedChat
          messages={this.props.userSelectedEvent.eventChat.reverse()}
          onSend={this.onSend}
          user={{
            _id: this.props.user._id,
            name: this.props.user.name,
            avatar: this.props.user.picture,          
          }}
          isAnimated={true}
          renderBubble={this.renderBubble}
          renderFooter={this.renderFooter}
        />
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

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
    renderEventChatView: state.renderEventChatView,
    user: state.user,
    events: state.events,
    userSelectedEvent: state.userSelectedEvent
});

export default connect(mapStateToProps)(EventChat);