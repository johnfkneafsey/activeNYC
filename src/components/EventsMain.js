
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
// import Icon from 'react-native-vector-icons/FontAwesome';


const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../data/playingBall.jpg'),
    },
        {
        text: 'Card 2',
        name: 'two',
        image: require('../data/playingBall.jpg'),
    },
        {
        text: 'Card 3',
        name: 'three',
        image: require('../data/playingBall.jpg'),
    },
        {
        text: 'Card 4',
        name: 'four',
        image: require('../data/playingBall.jpg'),
    }


];

export class EventsMain extends React.Component {
    constructor(props) {
        super(props);
        this.renderEventsView = this.renderEventsView.bind(this);
        this.facilityTypeView = this.facilityTypeView.bind(this);
    }

    renderEventsView() {
        this.props.dispatch(actions.renderEventsView());
    }

    facilityTypeView() {
        this.props.dispatch(actions.facilityTypeView());
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
        let typeIcon = this.props.icons[this.props.parkType]

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
                        <Button transparent onPress={() => { this.renderEventsView()}} >
                            <Icon name="ios-map" />
                        </Button>
                    </Right>
                </Header>               
                <View>
                    <DeckSwiper
                        dataSource={this.props.markers}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: "https://unsplash.it/200/300/?random"}} />
                                    </Left>
                                    <Body>
                                        <Text>{item.Name}</Text>
                                        <Text note>{item.Location}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{  width: 50, flex: 1, height: 200 }} source={{uri: "https://unsplash.it/200/300/?random"}} />
                                </CardItem>
                                <CardItem>
                                    <Icon name={typeIcon} style={{ color: '#ED4A6A' }} />
                                    <Text>Schedule</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
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
    icons: state.icons
});


export default connect(mapStateToProps)(EventsMain);