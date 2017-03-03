import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import store from '../store/store';


export class ParkSelection extends Component {
    constructor(props) {
        super(props);
		this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton(park) {
        console.log(park);
    }


      render() {

          return (
              <Container>
                  <Content>

                 
                      <Button  success bordered round onPress={() => { this.onPressButton("basketball") }} >
                          <Text>Basketball Courts</Text>
                      </Button>
                      

                   
                      <Button  bordered round onPress={() => { this.onPressButton("soccerAndFootball") }} >
                          <Text>Football and Soccer Fields</Text>
                      </Button>
                      

                   
                      <Button  success bordered round onPress={() => { this.onPressButton("runningtracks") }}>
                          <Text>Running Tracks</Text>
                      </Button>
                       

                   
                      <Button  info bordered round onPress={() => { this.onPressButton("pools_indoor") }} >
                          <Text>Swimming Pools</Text>
                      </Button>
                      

                   
                      <Button  warning bordered round onPress={() => { this.onPressButton("tennis") }}>
                          <Text>Tennis Courts</Text>
                      </Button>
                          

                   
                      <Button  danger bordered round onPress={() => { this.onPressButton("bocce") }}>
                          <Text>Bocce Courts</Text>
                      </Button>
                       

                   
                      <Button  success bordered round onPress={() => { this.onPressButton("cricket") }}>
                          <Text>Cricket Fields</Text>
                      </Button>
                     


                      <Button  success bordered round onPress={() => { this.onPressButton("handball") }}>
                          <Text>Handball Courts</Text>
                      </Button>       
                         


                      <Button dark bordered round onPress={() => { this.onPressButton("kayak") }}>
                          <Text>Kayak/Canoe Launches</Text>
                      </Button>
  


                      <Button dark bordered round onPress={() => { this.onPressButton("iceskating") }}>
                          <Text>Ice Skating Rinks</Text>
                      </Button>


                  </Content>
              </Container>
          );
      }
}

const mapStateToProps = (state, props) => ({
    parkType: state.parkType
});


export default connect(mapStateToProps)(ParkSelection);
