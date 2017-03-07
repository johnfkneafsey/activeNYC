import update from 'immutability-helper';
import * as actions from '../actions/actions';
import store from '../store/store';
import { facilityData } from '../data/facilityData';
import { findNearest } from '../algorithms/displayNearest';



const initialState = {
    parkType: null,
    facilityData: null,
    markers: null,
    selectedFacility: null,
    initialPosition: null,
    lastPosition: null,
    userLatitude: 40.7565,
    userLongitude: -73.5734,
    renderListView: 1,
    renderEventsView: 1,
    icons: {
        basketball: "ios-basketball",
        bocce: "ios-disc",
        cricket: "ios-disc",
        handball: "ios-globe-outline",
        iceskating: "ios-snow",
        soccerAndFootball: "ios-football",
        pools_indoor: "ios-analytics",
        tennis: "ios-tennisball",
        runningtracks: "ios-walk",
        kayak: "ios-boat"
    }
    // EVENTS DB - THIS WILL GO TO BACK END

    // END BACKEND

}

export const mainReducer = (state= initialState, action) => {


    if (action.type === actions.SELECT_PARK_TYPE) {

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SELECT_PARK_TYPE GETSTATE()")}, 3000);

        return update(state, {
            parkType: {$set: action.parkType},
            facilityData: {$set: facilityData[action.parkType]},
        })
    }
    
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

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SHOW_MARKERS GETSTATE()")}, 3000);

        let markerResults = findNearest(action.facilities, action.userLat, action.userLon, action.results)

        console.log('5 NEAREST RESULTS', markerResults);

        return update(state, {
            markers: {$set: markerResults},
            userLatitude: {$set: action.userLat},
            userLongitude: {$set: action.userLon}
        })
    }   

    if (action.type === actions.SELECTED_FACILITY) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SELECTED_FACILITY GETSTATE()")}, 3000);
        
        let parsedFacility;

        if (typeof action.facility === "string") {
            parsedFacility = JSON.parse(action.facility)
        } else {
            parsedFacility = action.facility
        }

        return update(state, {
            selectedFacility: {$set: parsedFacility}
        })
    }

    if (action.type === actions.RENDER_LIST_VIEW) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE RENDER_LIST_VIEW GETSTATE()")}, 3000);


        return update(state, {
            renderListView: {$apply: function(x) {return x + 1;}}
        })
    }

    if (action.type === actions.FACILITY_TYPE_VIEW) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE FACILITY_TYPE_VIEW GETSTATE()")}, 3000);


        return update(state, {
            parkType: {$set: null}
        })
    }

    if (action.type === actions.RENDER_EVENTS_VIEW) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE RENDER_EVENTS_VIEW GETSTATE()")}, 3000);


        return update(state, {
            renderEventsView: {$apply: function(x) {return x + 1;}}
        })
    }

	return state;
    

}

