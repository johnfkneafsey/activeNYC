import React, { Component } from 'react';
import { Modal, View, StyleSheet, Text, Dimensions, InteractionManager, TouchableHighlight, Linking, ScrollView} from 'react-native';
import MapView, { Marker, UrlTile, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomCallout from './CustomCallout';
import { Container, Card, Thumbnail, CardItem, Content, Icon, Button, Footer, FooterTab, Header, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
const customMapStyle = [
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "saturation": 36
      },
      {
        "lightness": 40
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      },
      {
        "weight": 1.2
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e5c163"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#c4c4c4"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#e5c163"
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 21
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 18
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#575757"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e5c163"
      },
      {
        "lightness": "0"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#e5c163"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#999999"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 19
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      }
    ]
  }
]


const foursquare = require('react-native-foursquare-api')({
  clientID: 'XFP50ZHK1ADEQXMZVRPT3GNVLRZJVIELIJVE2WS4T3ZTI3FL',
  clientSecret: '50UNQ5MPQIYJASBURHQ1EQRCM02SK3T2F403ZDRZZ240IXMF',
  style: 'foursquare', // default: 'foursquare' 
  version: '20161016' //  default: '20140806' 
});

export class Geolocation extends React.Component {
    constructor(props) {
        super(props);
		this.markerPress = this.markerPress.bind(this);
        this.navigateToFacility = this.navigateToFacility.bind(this);
        this.facilityTypeView = this.facilityTypeView.bind(this);
        this.renderListView = this.renderListView.bind(this);
        this.renderEventsView = this.renderEventsView.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.loadEvents());
    }

    markerPress(e) {
        console.log('MARKER PRESSED SELECTED')
        let bestMatch = null;
        for (i = 0; i < this.props.markers.length; i ++) {
            if (e.nativeEvent.id === this.props.markers[i].Prop_ID) {
                let facilityObj = this.props.markers[i];
                let facility = JSON.stringify(this.props.markers[i])
                console.log('FACILITY HEEEYA' , facilityObj)
                let paramsVenues = {
                    "ll": facilityObj.lat + "," + facilityObj.lon,
                    "query": facilityObj.Name,
                    "venuePhotos": 1
                };
                this.props.dispatch(actions.selectedFacility(facility))
                this.props.dispatch(actions.asyncSaveVenueToStore(paramsVenues))
            }
        }
    }

    navigateToFacility(url) {
        Linking.openURL(url);
    }

    renderListView() {
        this.props.dispatch(actions.renderListView());
    }

    facilityTypeView() {
 
        this.props.dispatch(actions.facilityTypeView());
    }

    renderEventsView() {
        this.props.dispatch(actions.renderEventsView());
    }

    render() {

        let iconToggle;

        if (this.props.renderListView % 2 === 0) {
            iconToggle =  "ios-map"
        } else {
            iconToggle = "menu"
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

        let cardView = <View></View>

        let mapFocusLatitude;
        let mapFocusLongitude;

        if (this.props.selectedFacility && this.props.initialPosition.coords.latitude) {
            mapFocusLatitude = this.props.selectedFacility.lat;
            mapFocusLongitude = this.props.selectedFacility.lon;
        } 

        let footer = <View></View>

        if (this.props.selectedVenue) {
            
            let prefix = this.props.selectedVenue.featuredPhotos.items[0].prefix;
            let suffix = this.props.selectedVenue.featuredPhotos.items[0].suffix;
            let size = "height300"
            let photoURL = prefix + size + suffix;

            cardView = 
                <View style={{flex: .30, backgroundColor: 'rgb(51,53,51)', justifyContent: 'center'}}>
                  <Card style={{ padding: 10, backgroundColor: 'rgb(51,53,51)'}}>
                      <CardItem style={{ backgroundColor: 'rgb(245, 203, 92)', borderRadius: 6}} >       
                        <Body style={{ backgroundColor: 'rgb(245, 203, 92)', flexDirection: 'row'}}>
                            <View style={{flex:1}} >
                              <Text style={{fontFamily: 'Bungee-Regular',}}>{this.props.selectedFacility.Name}</Text>
                              <Text>Location: {this.props.selectedFacility.Location}</Text>
                              <Text>Status: {this.props.selectedVenue.hours.status}</Text>
                            </View>
                            <View style={{flex:.5, alignItems: 'center', justifyContent: 'center'}} >
                              <Thumbnail style={{width: 90, height: 90}}  source={{uri: photoURL}} />
                            </View>
                        </Body>
                      </CardItem>
                  </Card> 
                </View>
  
        } else {

            let cardView = () => {
                return (
                    <View></View>
                )
            }
        }

        if (this.props.selectedFacility) {
            footer = 
                <Footer style={{backgroundColor: 'rgb(245, 203, 92)'}} >
                    <FooterTab>
                        <Button transparent onPress={() => { this.navigateToFacility('http://maps.apple.com/?saddr=' + this.props.userLatitude + ',' + this.props.userLongitude + '&daddr=' + + this.props.selectedFacility.lat + ',' + this.props.selectedFacility.lon)}}>
                            <Icon style={{color: 'rgb(48,188,237)'}} name="ios-walk-outline" />
                            <Text style={{color: 'rgb(51,53,51)', fontFamily: 'Bungee-Regular', fontSize: 12}}>Take me there</Text>
                        </Button>
                    </FooterTab>
                    <FooterTab style={{borderLeftColor: 'rgb(51,53,51)', borderLeftWidth: 1, borderStyle: 'solid'}}>
                        <Button transparent button onPress={() => { this.renderEventsView()}}>
                            <Icon style={{color: 'rgb(48,188,237)'}} name="ios-people" />
                            <Text style={{color: 'rgb(51,53,51)', fontFamily: 'Bungee-Regular', fontSize: 12}}>Matches and Events</Text>
                        </Button>
                    </FooterTab>
                </Footer>
        }

        if (this.props.markers) {
            return (
                <Container style={styles.blackBackground}>
                    <Header style={{backgroundColor: 'rgb(245, 203, 92)'}}>
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
                            <Button transparent onPress={() => { this.renderListView()}} >
                                <Icon style={{color: 'rgb(48,188,237)'}} name={iconToggle} />
                            </Button>
                        </Right>
                    </Header>
                    <View style = {styles.container}>
                        <MapView
                            showsUserLocation = {true}
                            followUserLocation = {true}
                            provider={PROVIDER_GOOGLE}
                            customMapStyle={customMapStyle}
                            style={styles.map}
                            region={{
                                latitude: this.props.lastPosition.coords.latitude, 
                                longitude: this.props.lastPosition.coords.longitude, 
                                latitudeDelta: 0.0222,
                                longitudeDelta: 0.0201,
                            }}
                        >

                        {this.props.markers.map(marker => {
                            return (
                            <MapView.Marker
                                onPress={this.markerPress}
                                key={marker.Prop_ID}                        
                                coordinate={{
                                    latitude: Number(marker.lat),
                                    longitude: Number(marker.lon),
                                }}
                                title={marker.Name}
                                description={marker.Location}
                                identifier={marker.Prop_ID}
                                pinColor={'rgb(48,188,237)'}
                            >
                            <MapView.Callout tooltip style={styles.customView}>
                              <CustomCallout>
                                <Text style={styles.parkTitleText} >{marker.Name}</Text>                                                         
                              </CustomCallout>
                            </MapView.Callout>
                            </MapView.Marker>
                            )})}
                        </MapView>
                    </View>
                    {cardView}
                    {footer}
                </Container>
            )
        }

        return (
            <View style = {styles.container}>
                <MapView
                    showsUserLocation = {true}
                    followUserLocation = {true}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={customMapStyle}
                    style={styles.map}
                    region={{
                        latitude: this.props.userLatitude, 
                        longitude: this.props.userLongitude, 
                        latitudeDelta: 0.0222,
                        longitudeDelta: 0.0201,
                    }}
                >
                </MapView>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,53,51)',
    },
    blackBackground: {
        flex: 1,
        backgroundColor: 'rgb(51,53,51)',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    parkTitleText: {
        fontFamily: 'Bungee-Regular',
        fontSize: 14
    },
    parkLocationText: {
         fontSize: 12
    },
})

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

export default connect(mapStateToProps)(Geolocation);