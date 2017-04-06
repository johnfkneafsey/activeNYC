
import React, { Component } from 'react';
import { Modal, View, StyleSheet, Text, Dimensions, InteractionManager, TouchableHighlight, Linking, ScrollView } from 'react-native';
import { Container, Header, Card, Thumbnail, CardItem, Content, Button, Footer, Icon, FooterTab, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import { Image, Overlay, Tile, Subtitle } from '@shoutem/ui';
const foursquare = require('react-native-foursquare-api')({
  clientID: 'XFP50ZHK1ADEQXMZVRPT3GNVLRZJVIELIJVE2WS4T3ZTI3FL',
  clientSecret: '50UNQ5MPQIYJASBURHQ1EQRCM02SK3T2F403ZDRZZ240IXMF',
  style: 'foursquare', // default: 'foursquare' 
  version: '20161016' //  default: '20140806' 
});

export class ListView extends React.Component {
  constructor(props) {
      super(props);
      this.selectFacilityandViewMap = this.selectFacilityandViewMap.bind(this);  
      this.renderListView = this.renderListView.bind(this);
      this.renderEventsView = this.renderEventsView.bind(this);  
      this.facilityTypeView = this.facilityTypeView.bind(this);  
      this.getPhoto = this.getPhoto.bind(this);
  }  
  
  renderListView() {
      this.props.dispatch(actions.renderListView());
  }

  selectFacilityandViewMap(facility) {
    this.props.dispatch(actions.selectedFacility(facility))  
    this.props.dispatch(actions.renderListView());
  }

  renderEventsView() {
    this.props.dispatch(actions.renderEventsView());
  }

  facilityTypeView() {
    this.props.dispatch(actions.facilityTypeView());
    this.props.dispatch(actions.renderListView());
  }
  
  navigateToFacility(url) {
    Linking.openURL(url);
  }

  getPhoto(facility) {
    let paramsVenues = {
      "ll": facility.lat + "," + facility.lon,
      "query": facility.Name,
      "venuePhotos": 1
    }
    console.log('PARAMS VENUES', paramsVenues)
     let url; 
     foursquare.venues.explore(paramsVenues)
      .then(function(venues) {
        console.log('THIS IS VENUES IN LISTVIEW ', venues) 
        return venues       
      })
      .then(venues => {
        let prefix = venues.response.groups[0].items[0].venue.featuredPhotos.items[0].prefix;
        let suffix = venues.response.groups[0].items[0].venue.featuredPhotos.items[0].suffix;        
        let size = "height300"   
        let photoUrl = prefix + size + suffix;     
        console.log('THIS IS PHOTO URL ', photoUrl) 
        console.log('THIS IS PHOTO URL  STRING', photoUrl.toString()) 
        // url = photoUrl
        return photoUrl.toString()
      })
    // return url;
  }

  render() {

    let iconToggle;
    if (this.props.renderListView % 2 === 0) {
      iconToggle =  "ios-map"
    } else {
      iconToggle = "ios-map"
    }

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
    let imageSource;
    let _this = this;
    let results = this.props.markers.map(facility => {
      
      imageSource = (function() {
        return _this.getPhoto(facility)
      })();
      console.log('IMAGE SOURCE ', imageSource)

      return (
          <Card key={facility.Prop_ID} style={{backgroundColor: 'rgb(245, 203, 92)', marginLeft: 10, marginRight: 10, alignItems: 'center', justifyItems: 'center'}}>                 
            <View style={{flexDirection: 'column', alignItems: 'center', justifyItems: 'center', marginTop: 10}}>
              <Image styleName='medium-banner' source={{uri: imageSource }} />
              <Text style={{fontFamily: 'Bungee-Regular',}}>{facility.Name}</Text>
              <Text>{facility.Location}</Text>
              <View style={{flexDirection: 'row'}}>
                <Button transparent button onPress={() => { this.renderEventsView()}}>
                  <Icon style={{color: 'rgb(48,188,237)'}} name="ios-people" />
                  <Text style={{color: 'rgb(51,53,51)', fontFamily: 'Bungee-Regular', fontSize: 12}}>Matches and Events</Text>
                </Button>
                <Button transparent onPress={() => { this.navigateToFacility('http://maps.apple.com/?saddr=' + this.props.userLatitude + ',' + this.props.userLongitude + '&daddr=' + + this.props.markers.lat + ',' + this.props.markers.lon)}}>
                  <Icon style={{color: 'rgb(48,188,237)'}} name="ios-walk-outline" />
                  <Text style={{color: 'rgb(51,53,51)', fontFamily: 'Bungee-Regular', fontSize: 12}}>Take me there</Text>
                </Button>  
              </View>
            </View>
          </Card>
      )
    })

      return(
        <Container style={{backgroundColor: 'rgb(51,53,51)'}}>
          <Header style={{backgroundColor: 'rgb(245, 203, 92)'}}>
            <Left>
              <Button transparent onPress={() => { this.renderListView()}} >
                <Icon style={{color: 'rgb(48,188,237)'}} name='arrow-back' />
                <Text></Text>
              </Button>
            </Left>
            <Body>
              <Text style={{color: 'rgb(51,53,51)', fontFamily: 'Bungee-Regular', fontSize: 18}} >{displayTitle}</Text>
            </Body>
            <Right>
            </Right>
          </Header>
          <ScrollView>
            {results}
          </ScrollView>
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
    selectedVenue: state.selectedVenue    
});


export default connect(mapStateToProps)(ListView);