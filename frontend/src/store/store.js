import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
// import logger from 'redux-logger';
import persistedReducer from '../reducers/root_reducer';
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
	const { logger } = require('redux-logger');
	middlewares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store);

export {store, persistor};
