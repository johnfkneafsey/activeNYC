// timepicker not reading and writing properly


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


/*
Title USER                                     Organizer: 
                                            [           ]
Description:  USER                          [           ] FB
~~~~~~~~~~~~~~~~~~~~~~~~~~                  [           ]
~~~~~~~~~~~~~~~~~~~~~~~~~~                  Beyonce Knowles FB
~~~~~~~~~~~~~~~~~~~~~~~~~~                   

Time: USER

Location: CURRENTPARK
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Attending:  EVENTATTENDEES  
[  ][  ][  ][  ][  ]
[  ][  ][  ][  ][  ]   ... and 3 others


Chat:
|
|
|
|
|
|
|
|
|




*/




    // EVENTS DB - THIS WILL GO TO BACK END
    globalEventsFAKE: [{
        eventName: "2 vs. 2 this Afternoon",
        eventOrganizerName: "James Freedman",
        eventLocation: "McCaffrey Playground",
        eventDescription: "former DIII player looking to play 2 on 2",
        eventParticipantProfileImage: 'https://unsplash.it/30/30/?random',
        //this is naive
        eventOrganizerProfileImage: 'https://unsplash.it/50/50/?random',
        eventDate: "Date XYZ",
        eventTime: "1:00 - 2:00 PM",
        eventParticipants: 4
    }, 
    {
        eventName: "Horse after Lunch",
        eventOrganizerName: "Pete West",
        eventLocation: "Godfrey Place Courts",
        eventDescription: "Husband/wife pair looking for another couple to play horse with",
        eventParticipantProfileImage: 'https://unsplash.it/30/30/?random',
        //this is naive
        eventOrganizerProfileImage: 'https://unsplash.it/50/50/?random',
        eventDate: "Date XYZ",
        eventTime: "2:00 - 2:30 PM",
        eventParticipants: 2
    },
    {
        eventName: "Someone to shoot around with",
        eventOrganizerName: "Beyonce Knowles",
        eventLocation: "Westwood High School",
        eventDescription: "I'll be shooting around after work at WHS, feel free to join me",
        eventParticipantProfileImage: 'https://unsplash.it/30/30/?random',
        //this is naive
        eventOrganizerProfileImage: 'https://unsplash.it/50/50/?random',
        eventDate: "Date XYZ",
        eventTime: "5:00 - 6:00 PM",
        eventParticipants: 1
    }, 
    {
        eventName: "Youth basketball team looking for volunteer coaches",
        eventOrganizerName: "Ray Allen",
        eventLocation: "Peter's District Basketball Courts",
        eventDescription: "U13 team looking for volunteer coaches every Sunday from 10am-12pm.",
        eventParticipantProfileImage: 'https://unsplash.it/30/30/?random',
        //this is naive
        eventOrganizerProfileImage: 'https://unsplash.it/50/50/?random',
        eventDate: "Date XYZ",
        eventTime: "10:00 - 12:00 PM",
        eventParticipants: 3
    }

    ]

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
            //needs help
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

	return state;
    

}

