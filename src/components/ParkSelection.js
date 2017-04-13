import React, { Component } from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import { Image, ListView, Tile, Title, Subtitle, Screen, Divider,  } from '@shoutem/ui';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import { Button } from 'react-native-elements'

export class ParkSelection extends React.Component {
    constructor(props) {
        super(props);
		this.onPressButton = this.onPressButton.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            facilities: [{
                "name": "Basketball Courts".toUpperCase(),
                "dbName": "basketball",
                "image": { "url": require('../data/basketballcourts.png') },
                }, 
                {
                "name": "Soccer Fields".toUpperCase(),
                "dbName": "soccerAndFootball",
                "image": { "url": require('../data/soccerfields.png') }
                }, 
                {
                "name": "Tennis Courts".toUpperCase(),
                "dbName": "tennis",
                "image": { "url": require('../data/tenniscourts.png') },
                }, 
                {
                "name": "Handball Courts".toUpperCase(),
                "dbName": "handball",
                "image": { "url": require('../data/handballcourts.png') },
                }, 
                {
                "name": "Cricket Fields".toUpperCase(),
                "dbName": "cricket",
                "image": { "url": require('../data/cricketfields.png') },
                },
                {
                "name": "Bocce Courts".toUpperCase(),
                "dbName": "bocce",
                "image": { "url": require('../data/boccecourts.png') },
                }, 
                {
                "name": "Swimming Pools".toUpperCase(),
                "dbName": "pools_indoor",
                "image": { "url": require('../data/swimmingpools.png') },
                }, 
                {
                "name": "Kayak & Canoe Launches".toUpperCase(),
                "dbName": "kayak",
                "image": { "url": require('../data/kayakandcanoe.png') },
                }, 
                {
                "name": "Ice Skating Rinks".toUpperCase(),
                "dbName": "iceskating",
                "image": { "url": require('../data/iceskatingrinks.png') },
                },                             
            ]
        }   
    }


    onPressButton(park) {
        this.props.dispatch(actions.selectParkType(park));
        this.props.dispatch(actions.pullParkData(park));

    }

    renderRow(facilities) {
        return (
            <TouchableOpacity onPress={() => { this.onPressButton(facilities.dbName) }} >
                <Image
                styleName="large-banner"
                source={facilities.image.url }
                >
                <Tile>
                    <View style={{backgroundColor: 'black',  height: 13, alignItems: 'center', justifyContent: 'center'}} >
                        <Text style={{ color: 'rgb(245, 203, 92)', fontFamily: 'Brother1816Printed-Black', alignItems: 'center', justifyContent: 'center'}} styleName="md-gutter-bottom">{facilities.name}</Text>
                    </View>
                </Tile>
                </Image>
                <Divider styleName="line" />
            </TouchableOpacity>
        );
    }

    render() {
        return (
        <Screen>
            <ListView
                data={this.state.facilities}
                renderRow={this.renderRow.bind(this)}
            />
        </Screen>
        );
    }
}

const mapStateToProps = (state, props) => ({
    parkType: state.parkType,
    facilityData: state.facilityData,
    initialPosition: state.initialPosition,
    lastPosition: state.lastPosition,
    icons: state.icons
});


export default connect(mapStateToProps)(ParkSelection);
