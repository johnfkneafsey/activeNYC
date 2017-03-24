import React, { Component } from 'react';
import { Image, View, ScrollView } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import CalendarStrip from 'react-native-calendar-strip';
import FBSDK from 'react-native-fbsdk';
const moment = require('moment');
const {LoginButton, GraphRequest, GraphRequestManager, AccessToken} = FBSDK;


export class Login extends React.Component {
    constructor(props) {
        super(props); 
    }


    render() {

        return (
            <View>
                <LoginButton
                    readPermissions={['public_profile']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("Login was cancelled");
                            } else {
                                console.log("Login was successful with permissions: " + result.grantedPermissions)
                                console.log('resulttttt log', result)
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                    let accessToken = data.accessToken

                                    const responseInfoCallback = (error, result) => {
                                        if (error) {
                                            console.log(error)
                                        } else {
                                            console.log('USER COMING BACK FROM FB ', result)
                                 //           this.props.dispatch(actions.saveProfileToStore(result));
                                            this.props.dispatch(actions.updateUserInDatabase(result));
                                        }
                                    }

                                    const infoRequest = new GraphRequest(
                                        '/me',
                                        {
                                        accessToken: accessToken,
                                        parameters: {
                                            fields: {
                                            string: 'email,name,first_name,link,middle_name,last_name,cover,birthday,gender,picture'
                                            }
                                        }
                                        },
                                        responseInfoCallback
                                    );

                                    // Start the graph request.
                                    new GraphRequestManager().addRequest(infoRequest).start()
                                    })
                                }
                            }
                        }
                    onLogoutFinished={() => console.log("User logged out")}
                />
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
    renderEventsView: state.renderEventsView,
    icons: state.icons,
    globalEventsFAKE: state.globalEventsFAKE
});


export default connect(mapStateToProps)(Login);


