import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    Dimensions,
    InteractionManager,
    TouchableHighlight
} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Container, Card, CardItem, Content, Button, Footer, FooterTab, Icon, Header, Title, Left, Right, Body } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';

export class GeolocationExample extends React.Component {
    constructor(props) {
        super(props);
		this.markerPress = this.markerPress.bind(this);
    }

    markerPress(e) {
        for (i = 0; i < this.props.markers.length; i ++) {
            if (e.nativeEvent.id === this.props.markers[i].Prop_ID) {
                let facility = this.props.markers[i]
                this.props.dispatch(actions.selectedFacility(facility))
            }
        }
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


        if (this.props.markers) {
            console.log('MARKERS DETECTED')
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
                            <Button transparent>
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

                    <Card>
                        <CardItem>
                            <Body>
                                <Text>
                                    //Your text here
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
   
                    <Footer>
                        <FooterTab>
                            <Button transparent>
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

        console.log('NO MARKERS DETECTED')

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
    userLongitude: state.userLongitude
});


export default connect(mapStateToProps)(GeolocationExample);
