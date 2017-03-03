import update from 'immutability-helper';
import * as actions from '../actions/actions';
import store from '../store/store';


const initialState = {
    parkType: null
}

export const mainReducer = (state= initialState, action) => {
    if (action.type === actions.SELECT_PARK_TYPE) {
        setTimeout(()=> { console.log(store.getState(), "THIS IS THE SELECT_PARK_TYPE GETSTATE()")}, 3000);

        return update(state, {
            parkType: {$set: action.parkType}
        })
    }
	return state;
}

