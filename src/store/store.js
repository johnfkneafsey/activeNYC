import { createStore, applyMiddleware } from 'redux';
import { mainReducer } from '../reducer/reducer';
import thunk from 'redux-thunk';


export default createStore(mainReducer, applyMiddleware(thunk));