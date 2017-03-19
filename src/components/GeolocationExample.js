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
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Container, Card, Thumbnail, CardItem, Content, Icon, Button, Footer, FooterTab, Header, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
const foursquare = require('react-native-foursquare-api')({
  clientID: 'XFP50ZHK1ADEQXMZVRPT3GNVLRZJVIELIJVE2WS4T3ZTI3FL',
  clientSecret: '50UNQ5MPQIYJASBURHQ1EQRCM02SK3T2F403ZDRZZ240IXMF',
  style: 'foursquare', // default: 'foursquare' 
  version: '20161016' //  default: '20140806' 
});

export class GeolocationExample extends React.Component {
    constructor(props) {
        super(props);
		this.markerPress = this.markerPress.bind(this);
        this.navigateToFacility = this.navigateToFacility.bind(this);
        this.facilityTypeView = this.facilityTypeView.bind(this);
        this.renderListView = this.renderListView.bind(this);       
        this.renderEventsView = this.renderEventsView.bind(this);
    }

    markerPress(e) {
        for (i = 0; i < this.props.markers.length; i ++) {
            if (e.nativeEvent.id === this.props.markers[i].Prop_ID) {
                let facilityObj = this.props.markers[i];
                let facility = JSON.stringify(this.props.markers[i])
                console.log('FACILITY HEEEYA' , facilityObj)

                let params = {
                        "ll": facilityObj.lat + "," + facilityObj.lon,
                    "query": facilityObj.Name
                    };
                    
                foursquare.venues.getVenues(params)
                    .then(function(venues) {
                            console.log('venuesf sfjskgsjg' , venues);
                        })
                    .catch(function(err){
                        console.log(err);
                    });


                this.props.dispatch(actions.selectedFacility(facility))
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

        if (this.props.selectedFacility) {
            cardView = 
                <Card style={{flex: .3}}>
                    <CardItem>       
                            <Body>
                                <Thumbnail style={{width: 240, height: 69}} square source={{uri: "https://unsplash.it/200/300/?random"}} />
                                <Title>{this.props.selectedFacility.Name}</Title>
                                <Text>Location: {this.props.selectedFacility.Location}</Text>
                                <Text>Property ID: {this.props.selectedFacility.Prop_ID}</Text>
                            </Body>
                    </CardItem>
                </Card> 
                    
        } else {

            let cardView = () => {
                return (
                    <View></View>
                )
            }
        }

        if (this.props.markers) {
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
                            <Button transparent onPress={() => { this.renderListView()}} >
                                <Icon name={iconToggle} />
                            </Button>
                        </Right>
                    </Header>
                    <View style = {styles.container}>
                        <MapView
                            showsUserLocation = 'true'
                            followUserLocation = 'true'
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
                            <Marker
                                onSelect={this.markerPress}
                                key={marker.Prop_ID}                        
                                coordinate={{
                                    latitude: Number(marker.lat),
                                    longitude: Number(marker.lon),
                                }}
                                title={marker.Name}
                                description={marker.Location}
                                identifier={marker.Prop_ID}
                            />

                            )})}
                        </MapView>
                    </View>
                    {cardView}
                    <Footer>
                        <FooterTab>
                            <Button transparent onPress={() => { this.navigateToFacility('http://maps.apple.com/?saddr=' + this.props.userLatitude + ',' + this.props.userLongitude + '&daddr=' + + this.props.selectedFacility.lat + ',' + this.props.selectedFacility.lon)}}>
                                <Icon name="ios-walk-outline" />
                                <Text>Take me there</Text>
                            </Button>
                        </FooterTab>
                        <FooterTab>
                            <Button transparent button onPress={() => { this.renderEventsView()}}>
                                <Icon name="ios-people" />
                                <Text>Matches and Events</Text>
                            </Button>
                        </FooterTab>
                    </Footer>   
                </Container>
            )
        }


        return (
            <View style = {styles.container}>
                <MapView
                    showsUserLocation = 'true'
                    followUserLocation = 'true'
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
        backgroundColor: '#F5FCFF',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
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
    renderEventsView: state.renderEventsView
});


export default connect(mapStateToProps)(GeolocationExample);
