
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
import { Container, Card, Thumbnail, CardItem, Content, Button, Footer, Icon, FooterTab, Header, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class ListView extends React.Component {
    constructor(props) {
        super(props);
    }  
  
renderListView() {
  this.props.dispatch(actions.renderListView());
}

  
selectedFacility(facility) {
  console.log('FACILITY REPONSE LISTVIEW', facility)
  this.props.dispatch(actions.selectedFacility(facility))
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
                      <Thumbnail style={{width: 240, height: 132}} square source={{uri: 'https://static01.nyt.com/images/2010/08/06/arts/06nyctennis-5/TENN-3-popup.jpg' }} />
                        <Title>{facility.Name}</Title>
                        <Text>{facility.Location}</Text>
                        <Text>{facility.Prop_ID}</Text>
                        <Text>Prop_ID: {facility.Location}</Text>
                        <Text>Latitude: {facility.lat}</Text>
                        <Text>Longitude: {facility.lon}</Text>
                        <Text>DistanceVariance: {facility.locationVariance}</Text>
                        <Button>
                          <Icon name="ios-people" />
                        </Button>
                        <Button button onPress={() => { this.selectedFacility(facility)}}>
                          <Icon name="ios-map" />
                        </Button>
                        <Button>
                          <Icon name='ios-information-circle' />
                        </Button>
                    </Body>

                </CardItem>
            </Card>
      )
    })


      return(
        <View>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
                <Text></Text>
              </Button>
              </Left>
              <Body>
              <Title>{displayTitle}</Title>
              </Body>
              <Right>
              <Button transparent onPress={() => { this.renderListView()}} >
                <Icon name={iconToggle} />
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
    renderListView: state.renderListView
});


export default connect(mapStateToProps)(ListView);