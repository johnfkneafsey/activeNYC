import React, { Component } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Container, Content, Button, Text, Icon } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class ParkSelection extends React.Component {
    constructor(props) {
        super(props);
		this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton(park) {
        this.props.dispatch(actions.selectParkType(park));
        this.props.dispatch(actions.pullParkData(park));

    }

  

      render() {

          return (
              <Container>
                  <Content>

                 
                      <Button  success bordered round onPress={() => { this.onPressButton("basketball") }} >
                          <Text>Basketball Courts</Text>
                          <Icon name={this.props.icons.basketball} />
                      </Button>
                      

                   
                      <Button  bordered round onPress={() => { this.onPressButton("soccerAndFootball") }} >
                          <Text>Football and Soccer Fields</Text>
                          <Icon name={this.props.icons.soccerAndFootball} />
                      </Button>
                      

                   
                      <Button  success bordered round onPress={() => { this.onPressButton("runningtracks") }}>
                          <Text>Running Tracks</Text>
                          <Icon name={this.props.icons.runningtracks} />                          
                      </Button>
                       

                   
                      <Button  info bordered round onPress={() => { this.onPressButton("pools_indoor") }} >
                          <Text>Swimming Pools</Text>
                          <Icon name={this.props.icons.pools_indoor} />                          
                      </Button>
                      

                   
                      <Button  warning bordered round onPress={() => { this.onPressButton("tennis") }}>
                          <Text>Tennis Courts</Text>
                          <Icon name={this.props.icons.tennis} />                          
                      </Button>
                          
                   

                      <Button  danger bordered round onPress={() => { this.onPressButton("bocce") }}>
                          <Text>Bocce Courts</Text>
                          <Icon name={this.props.icons.bocce} />                          
                      </Button>
                       

                   
                      <Button  success bordered round onPress={() => { this.onPressButton("cricket") }}>
                          <Text>Cricket Fields</Text>
                          <Icon name={this.props.icons.cricket} />                          
                      </Button>
                     


                      <Button  success bordered round onPress={() => { this.onPressButton("handball") }}>
                          <Text>Handball Courts</Text>
                          <Icon name={this.props.icons.handball} />                          
                      </Button>       
                         


                      <Button dark bordered round onPress={() => { this.onPressButton("kayak") }}>
                          <Text>Kayak/Canoe Launches</Text>
                          <Icon name={this.props.icons.kayak} />                          
                      </Button>
  


                      <Button dark bordered round onPress={() => { this.onPressButton("iceskating") }}>
                          <Text>Ice Skating Rinks</Text>
                          <Icon name={this.props.icons.iceskating} />                          
                      </Button>


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
