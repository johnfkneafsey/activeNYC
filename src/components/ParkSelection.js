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
                "name": "Basketball Courts",
                "dbName": "basketball",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/922/VakRb6.jpg" },
                }, 
                {
                "name": "Soccer Fields",
                "dbName": "soccerAndFootball",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/922/eFPz9U.jpg" }
                }, 
                {
                "name": "Tennis Courts",
                "dbName": "tennis",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/924/mKdaLM.jpg" },
                }, 
                {
                "name": "Handball Courts",
                "dbName": "handball",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/924/vhYbjM.jpg" },
                }, 
                {
                "name": "Cricket Fields",
                "dbName": "cricket",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/923/GlNzNV.jpg" },
                },
                {
                "name": "Bocce Courts",
                "dbName": "bocce",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/923/KYBEVS.jpg" },
                }, 
                {
                "name": "Swimming Pools",
                "dbName": "pools_indoor",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/924/nCXBsD.jpg" },
                }, 
                {
                "name": "Kayak & Canoe Launches",
                "dbName": "kayak",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/922/rfxi0E.jpg" },
                }, 
                {
                "name": "Ice Skating Rinks",
                "dbName": "iceskating",
                "image": { "url": "https://imagizer.imageshack.us/v2/xq90/922/jrCku6.jpg" },
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
                source={{ uri: facilities.image.url }}
                >
                <Tile>
                    <View style={{backgroundColor: 'black',  height: 15, alignItems: 'center', justifyContent: 'center'}} >
                        <Text style={{ color: 'rgb(245, 203, 92)', fontFamily: 'Bungee-Regular', alignItems: 'center', justifyContent: 'center'}} styleName="md-gutter-bottom">{facilities.name}</Text>
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
