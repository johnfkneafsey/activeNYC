import React, { Component } from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Button, Right,  DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import CalendarStrip from 'react-native-calendar-strip';
import FBSDK from 'react-native-fbsdk';
const moment = require('moment');
const {LoginButton, GraphRequest, GraphRequestManager, AccessToken} = FBSDK;
import Video from 'react-native-video';
import { Divider, Caption, Title } from '@shoutem/ui';


export class Login extends React.Component {
    constructor(props) {
        super(props);         
        this.state = {
            rate: 1,
            volume: 0,
            muted: true,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            paused: false,
            isBuffering: false,
        };

    }

    onLoadStart () {

    }

    onLoad () {
   
    }

    onProgress () {
      
    }

    onEnd () {
     
    }

    onBuffer () {
    
    }

    onError() {
   
    }    

    render() {

        return (
            
            <View style={stylesShout.container}>
                <View style={stylesShout.fullScreen}>
                    <Video
                        source={require('../../activetrimmed.mp4')}
                        rate={1.0}                              // 0 is paused, 1 is normal.
                        volume={0.0}                            // 0 is muted, 1 is normal.
                        muted={true}                           // Mutes the audio entirely.
                        paused={false}                          // Pauses playback entirely.
                        resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                        repeat={true}                           // Repeat forever.
                        playInBackground={false}                // Audio continues to play when app entering background.
                        playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                        progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                        onLoadStart={this.loadStart}            // Callback when video starts to load
                        onLoad={this.setDuration}               // Callback when video loads
                        onProgress={this.setTime}               // Callback every ~250ms with currentTime
                        onEnd={this.onEnd}                      // Callback when playback finishes
                        onError={this.videoError}               // Callback when video cannot be loaded
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                        style={stylesShout.backgroundVideo}
                    />
                </View>


            {/*<View style={{flexDirection: 'row', justifyContent: 'center' , backgroundColor: 'rgb(245, 203, 92)', height: 80, width: 400, borderStyle: 'solid', borderRadius: 25, borderColor: 'rgb(245, 203, 92)', borderWidth: 2, paddingHorizontal: 20, paddingVertical: 12, marginTop: 35, marginBottom: 550}}>*/}
                    {/*<Text style={{ color: 'rgb(51,53,51)', fontFamily: 'BungeeShade-Regular', fontSize: 50 }} >Active </Text><Text style={{ justifyContent: 'center' , textAlign: 'center', color: 'rgb(48,188,237)', fontFamily: 'BungeeShade-Regular', fontSize: 50 }} >NYC</Text>*/}
            <View style={{flexDirection: 'column', alignItems: 'center',  marginBottom: 350}} >  
                <Image style={{ marginTop: 33, }} source={require('../data/Bungee-Active-Inline.png')}  />
                <Image style={{ marginTop: -25, }} source={require('../data/Bungee-NYC-Inline.png')}  />                    
            </View>

                <Text></Text>
                <LoginButton
                    readPermissions={['public_profile']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                    let accessToken = data.accessToken
                                    const responseInfoCallback = (error, result) => {
                                        if (error) {
                                            console.log(error)
                                        } else {
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



const stylesShout = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});



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


      