
import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Dimensions,
    InteractionManager,
    TouchableHighlight,
    Linking,
    ScrollView,
    Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Container, Header, Card, Thumbnail, CardItem, Content, Button, Footer, Icon, FooterTab, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.selectFacilityandViewMap = this.selectFacilityandViewMap.bind(this);  
        this.renderListView = this.renderListView.bind(this);
        this.renderEventsView = this.renderEventsView.bind(this);  
        this.facilityTypeView = this.facilityTypeView.bind(this);  
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

    let displayTitle = nameObj[this.props.parkType]

    let results = this.props.markers.map(facility => {
      return (
            <Card key={facility.Prop_ID}>
                <CardItem>
                    
                    <Body>
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
                    </Body>

                </CardItem>
            </Card>
      )
    })


      return(
        <View>
          <Header>
            <Left>
              <Button transparent button onPress={() => { this.facilityTypeView()}}>
                <Icon name='arrow-back'  />
                <Text></Text>
              </Button>
              </Left>
              <Body>
              <Title>{displayTitle}</Title>
              </Body>
              <Right>
              <Button transparent button onPress={() => { this.renderEventsView()}} >
                <Icon name="ios-map" />
              </Button>
            </Right>
          </Header>
        <ScrollView>
          {results}
        </ScrollView>
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
    renderEventsView: state.renderEventsView
});


export default connect(mapStateToProps)(ListView);