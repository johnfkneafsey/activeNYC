import update from 'immutability-helper';
import * as actions from '../actions/actions';
import store from '../store/store';
import { facilityData } from '../data/facilityData';
import { findNearest } from '../algorithms/displayNearest';



const initialState = {
    parkType: null,
    facilityData: null,
    markers: null,
    initialPosition: null,
    lastPosition: null
}

export const mainReducer = (state= initialState, action) => {



    if (action.type === actions.SELECT_PARK_TYPE) {

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SELECT_PARK_TYPE GETSTATE()")}, 3000);

        return update(state, {
            parkType: {$set: action.parkType},
            facilityData: {$set: facilityData[action.parkType]},
        })
    }

    // if (action.type === actions.PULL_PARK_DATA) {

    //     setTimeout(()=> { console.log(store.getState(), "THIS IS THE PULL_PARK_DATA GETSTATE()")}, 3000);
    //     console.log('INITIAL POSIITION')
    //     //let markers = findNearest(action.parkType, userLat, userLong, 4)

    //     return update(state, {
    //         facilityData: {$set: facilityData[action.parkType]},

    //     })
    // }

    if (action.type === actions.SAVE_INITIAL_POSITION) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_INITIAL_LOCATION GETSTATE()")}, 3000);

        return update(state, {
            initialPosition: {$set: action.initialPosition}
        })
    }

    if (action.type === actions.SAVE_LAST_POSITION) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_LAST_POSITION GETSTATE()")}, 3000);

        return update(state, {
            lastPosition: {$set: action.lastPosition}
        })
    }

    if (action.type === actions.SHOW_MARKERS) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_LAST_POSITION GETSTATE()")}, 3000);

        let markerResults = findNearest(action.facilities, action.userLat, action.userLon, action.results)

        console.log('5 NEAREST RESULTS', markerResults);

        return update(state, {
            markers: {$set: markerResults}
        })
    }   

	return state;
    

}

