import React, { Component } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Container, Content, Text, Icon } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';
import { Button } from 'react-native-elements'

export class ParkSelection extends React.Component {
    constructor(props) {
        super(props);
		this.onPressButton = this.onPressButton.bind(this);
    }

    componentDidMount () {
        console.log('mounted')
    }

    onPressButton(park) {
        this.props.dispatch(actions.selectParkType(park));
        this.props.dispatch(actions.pullParkData(park));

    }


      render() {

          return (
              <Container>
                  <Content>

                 
                      <Button  onPress={() => { this.onPressButton("basketball") }} 
                           title='Basketball Courts'
                           raised
                           backgroundColor= '#8f7c00'
                      />
                         
                  
                      

                   
                      <Button   onPress={() => { this.onPressButton("soccerAndFootball") }} 
                           title='Football and Soccer Fields'
                           raised
                           backgroundColor= '#9dcc00'
                      />  
                      

                   
                      <Button onPress={() => { this.onPressButton("runningtracks") }}
                           title='Running Tracks' 
                           raised
                           backgroundColor= '#c20088'
                      />   

                   
                      <Button onPress={() => { this.onPressButton("pools_indoor") }} 
                           title='Swimming Pools' 
                           raised                    
                           backgroundColor= '#003380' 
                      />
                      

                   
                      <Button  warning bordered round onPress={() => { this.onPressButton("tennis") }}
                           title='Tennis Courts'
                           raised                    
                           backgroundColor= '#ffa405'   
                      />
                          
                   

                      <Button  onPress={() => { this.onPressButton("bocce") }}
                           title='Bocce Courts' 
                           raised
                           backgroundColor= '#ff0010'
                      />
                
                    
                      <Button   onPress={() => { this.onPressButton("cricket") }}
                           title='Cricket Fields' 
                           raised                   
                           backgroundColor= '#94ffb5'
                      />      
                     

                      <Button  onPress={() => { this.onPressButton("handball") }}
                           title='Handball Courts' 
                           raised                   
                           backgroundColor= '#00998f'
                      />                      
                               
                    
                      <Button onPress={() => { this.onPressButton("kayak") }}
                           title='Kayak/Canoe Launches' 
                           raised
                           backgroundColor= '#740aff'
                      />  


                      <Button  onPress={() => { this.onPressButton("iceskating") }}
                           title='Ice Skating Rinks' 
                           raised                
                           backgroundColor= '#990000'
                      />


                  </Content>
              </Container>
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
