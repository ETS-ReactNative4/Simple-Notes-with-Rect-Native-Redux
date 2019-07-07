import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './Reducer';

// logging for debugging
const logger = createLogger({});

// define createStoree
const store = createStore(
	rootReducer,
	applyMiddleware(
		logger, 
		promiseMiddleware
	)
);

export default store;