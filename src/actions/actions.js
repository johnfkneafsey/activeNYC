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