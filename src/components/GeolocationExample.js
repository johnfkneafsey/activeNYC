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
    ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Container, Card, Thumbnail, CardItem, Content, Button, Footer, FooterTab, Icon, Header, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';

export class GeolocationExample extends React.Component {
    constructor(props) {
        super(props);
		this.markerPress = this.markerPress.bind(this);
        this.navigateToFacility = this.navigateToFacility.bind(this);
    }

    markerPress(e) {
        for (i = 0; i < this.props.markers.length; i ++) {
            if (e.nativeEvent.id === this.props.markers[i].Prop_ID) {
                let facility = JSON.stringify(this.props.markers[i])
                console.log('hello', facility)
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

        let displayTitle = nameObj[this.props.parkType]

    let cardView = <View></View>

    
    if (this.props.selectedFacility) {
        cardView = 
            <Card style={{flex: .3}}>
                <CardItem>
                    <Body>
                        <Thumbnail style={{width: 240, height: 69}} square source={{uri: 'https://www.nycgovparks.org/facilities/images/basketball-header.jpg'}} />
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
                                <Icon name='menu' />
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
                            <Button transparent>
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
    selectedFacility: state.selectedFacility
});


export default connect(mapStateToProps)(GeolocationExample);
