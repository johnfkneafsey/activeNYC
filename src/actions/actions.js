import store from '../store/store'


export const SELECT_PARK_TYPE = 'SELECT_PARK_TYPE';
export const selectParkType = (parkType) => ({
	type: SELECT_PARK_TYPE,
	parkType: parkType
})

export const PULL_PARK_DATA = 'PULL_PARK_DATA'
export const pullParkData = (parkType) => ({
	type: PULL_PARK_DATA,
	parkType: parkType
})

export const SHOW_MARKERS = 'SHOW_MARKERS'
export const showMarkers = (facilities, userLat, userLon, results) => ({
	type: SHOW_MARKERS,
	facilities: facilities,
	userLat: userLat, 
	userLon: userLon,
	results: results,
	

})

export const SAVE_INITIAL_POSITION = 'SAVE_INITIAL_POSITION'
export const saveInitialPosition = (initialPosition) => ({
	type: SAVE_INITIAL_POSITION,
	initialPosition: initialPosition

})


export const SAVE_LAST_POSITION = 'SAVE_LAST_POSITION'
export const saveLastPosition = (lastPosition) => ({
	type: SAVE_LAST_POSITION,
	lastPosition: lastPosition

})


export const SELECTED_FACILITY = 'SELECTED_FACILITY'
export const selectedFacility = (facility) => ({
	type: SELECTED_FACILITY,
	facility: facility
})

export const RENDER_LIST_VIEW = 'RENDER_LIST_VIEW'
export const renderListView = () => ({
	type: RENDER_LIST_VIEW,

})

export const FACILITY_TYPE_VIEW = 'FACILITY_TYPE_VIEW'
export const facilityTypeView = () => ({
	type: FACILITY_TYPE_VIEW,

})

export const RENDER_EVENTS_VIEW = 'RENDER_EVENTS_VIEW'
export const renderEventsView = () => ({
	type: RENDER_EVENTS_VIEW,

})

export const SELECTED_DATE = 'SELECTED_DATE'
export const selectedDate = (date) => ({
	type: SELECTED_DATE,
	date: date

})

export const RENDER_NEW_EVENT_VIEW = 'RENDER_NEW_EVENT_VIEW'
export const renderNewEventView = () => ({
	type: RENDER_NEW_EVENT_VIEW,

})



export const USER_SELECTED_EVENT_START_TIME = 'USER_SELECTED_EVENT_START_TIME'
export const userSelectedEventStartTime = (time) => ({
	type: USER_SELECTED_EVENT_START_TIME,
	time: time

})

export const USER_SELECTED_EVENT_END_TIME = 'USER_SELECTED_EVENT_END_TIME'
export const userSelectedEventEndTime = (time) => ({
	type: USER_SELECTED_EVENT_END_TIME,
	time: time

})

export const USER_SELECTED_EVENT_DURATION = 'USER_SELECTED_EVENT_DURATION'
export const userSelectedEventDuration = (hours) => ({
	type: USER_SELECTED_EVENT_DURATION,
	hours: hours

})



