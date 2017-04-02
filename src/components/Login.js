import React, { Component } from 'react';
import { Image, View, ScrollView, StyleSheet } from 'react-native';
import { Container, Button, Right, Title, DeckSwiper, Card, Icon, Header, CardItem, Left, Body, Thumbnail, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import CalendarStrip from 'react-native-calendar-strip';
import FBSDK from 'react-native-fbsdk';
const moment = require('moment');
const {LoginButton, GraphRequest, GraphRequestManager, AccessToken} = FBSDK;
import Video from 'react-native-video';


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
        console.log('loading started ')
    }

    onLoad () {
        console.log('video loaded')
    }

    onProgress () {
        console.log('progress')
    }

    onEnd () {
        console.log('video ended')
    }

    onBuffer () {
        console.log('buffered')
    }

    onError() {
        console.log('error!!!')
    }    

    render() {

        return (
            

      <View style={styles.container}>
        <View style={styles.fullScreen}>
          <Video
            source={require('../../active.mp4')}
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
            style={styles.backgroundVideo}
        />
    </View>



                {/*<LoginButton
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
                />*/}


            </View>
        );
    }
}

// Later to trigger fullscreen
// this.player.presentFullscreenPlayer()

// To set video position in seconds (seek)
// this.player.seek(0)

// Later on in your styles..

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
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


      