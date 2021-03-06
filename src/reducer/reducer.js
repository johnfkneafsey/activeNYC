import update from 'immutability-helper';
import * as actions from '../actions/actions';
import store from '../store/store';
import { facilityData } from '../data/facilityData';
import { findNearest } from '../algorithms/displayNearest';


const initialState = {
    user: null,                 
    parkType: null,             
    facilityData: null,
    markers: null,
    selectedFacility: null,
    selectedVenue: null,
    initialPosition: null,
    lastPosition: null,
    userLatitude: 40.7565,
    userLongitude: -73.5734,
    renderListView: 1,
    renderEventsView: 1,
    renderNewEventView: 1,
    renderViewEventView: 1,
    renderEventChatView: 1,
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
    },
    selectedDate: null,    // change to userSelected . . 
    userSelectedEventStartTime: new Date(),
    userSelectedEventDuration: 1,
    userSelectedEvent: null,
    userSelectedEventTitle: null,
    userSelectedEventDescription: null,
    currentCardIndex: 0,
    events: null,

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

    if (action.type === actions.SELECTED_DATE) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SELECTED_DATE GETSTATE()")}, 3000);

        let date = action.date;

        return update(state, {
            selectedDate: {$set: date}
        })
    }

    if (action.type === actions.RENDER_NEW_EVENT_VIEW) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE RENDER_NEW_EVENT_VIEW GETSTATE()")}, 3000);

        return update(state, {
            renderNewEventView: {$apply: function(x) {return x + 1;}}
        })
    }

    if (action.type === actions.USER_SELECTED_EVENT_START_TIME) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE USER_SELECTED_EVENT_START_TIME GETSTATE()")}, 3000);
        
        let beginTime = action.time; 

        return update(state, {
            userSelectedEventStartTime: {$set: beginTime},
            })
    }


    if (action.type === actions.ADD_HOUR) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE ADD_HOUR GETSTATE()")}, 3000);

        return update(state, {
            userSelectedEventDuration: {$apply: function(x) {return x + 1;}}
        })
    }

    if (action.type === actions.SUBTRACT_HOUR) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SUBTRACT_HOUR GETSTATE()")}, 3000);

        return update(state, {
            userSelectedEventDuration: {$apply: function(x) {return x - 1;}}
        })
    }

    if (action.type === actions.RENDER_VIEW_EVENT_VIEW) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE RENDER_VIEW_EVENT_VIEW GETSTATE()")}, 3000);

        return update(state, {
            renderViewEventView: {$apply: function(x) {return x + 1;}},
  
            userSelectedEvent: {$set: action.event}
        })
    }

    if (action.type === actions.SAVE_PROFILE_TO_STORE) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_PROFILE_TO_STORE GETSTATE()")}, 3000);

        return update(state, {
            user: {$set: action.userProfile}
        })
    }

    if (action.type === actions.RENDER_EVENT_CHAT_VIEW) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE RENDER_EVENT_CHAT_VIEW GETSTATE()")}, 3000);

        return update(state, {
            renderEventChatView: {$apply: function(x) {return x + 1;}}
        })
    }

    if (action.type === actions.SAVE_FOURSQUARE_VENUE_TO_STORE) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_FOURSQUARE_VENUE_TO_STORE GETSTATE()")}, 3000);
        
        console.log('THIS IS THE VENUE OBJ IN REDUCER ', action.venueObj)
       
        return update(state, {
            selectedVenue: {$set: action.venueObj}
        })
    }

    if (action.type === actions.SAVE_EVENTS_TO_STORE) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_EVENTS_TO_STORE GETSTATE()")}, 3000);
        
        console.log('THIS IS THE EVENTS IN REDUCER ', action.events)
       
        return update(state, {
            events: {$set: action.events}
        })
    }

    if (action.type === actions.USER_SELECTED_EVENT_TITLE) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE USER_SELECTED_EVENT_TITLE GETSTATE()")}, 3000);

        return update(state, {
            userSelectedEventTitle: {$set: action.title}
        })
    }

    if (action.type === actions.USER_SELECTED_EVENT_DESCRIPTION) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SAVE_PROFILE_TO_STORE GETSTATE()")}, 3000);

        return update(state, {
            userSelectedEventDescription: {$set: action.description}
        })
    }

    if (action.type === actions.INCREMENT_CURRENT_CARD_INDEX) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE INCREMENT_CURRENT_CARD_INDEX GETSTATE()")}, 3000);
        
        return update(state, {
            currentCardIndex: {$apply: function(x) {return x + 1;}}
        })
    }

    if (action.type === actions.SET_CURRENT_CARD_INDEX_TO_ZERO) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SET_CURRENT_CARD_INDEX_TO_ZERO GETSTATE()")}, 3000);
        
        return update(state, {
            currentCardIndex: {$set: 0}
        })
    }

    if (action.type === actions.USER_SELECTED_EVENT) { 

        setTimeout(()=> { console.log(store.getState(), "THIS IS THE USER_SELECTED_EVENT GETSTATE()")}, 3000);
        
        return update(state, {
            userSelectedEvent: {$set: action.event}
        })
    }

	return state;
    

}

