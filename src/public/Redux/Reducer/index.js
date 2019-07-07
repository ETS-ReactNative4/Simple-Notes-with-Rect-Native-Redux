import { combineReducers } from 'redux';

// import all reducers
import notes from './notes';
import category from './category';

// combine thems 
const appReducer = combineReducers({
	notes : notes, //shorthand from notes:notes	
	category : category 	
})

export default appReducer; 