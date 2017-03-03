import store from '../store/store'


export const SELECT_PARK_TYPE = 'SELECT_PARK_TYPE';
export const selectParkType = (parkType) => ({
	type: SELECT_PARK_TYPE,
	parkType: parkType
})