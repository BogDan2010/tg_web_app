import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import categoriesReducer from './slices/categoriesSlice';

import basketReducer from './slices/basketSlice';

import userReducer from './slices/userSlice';

const appReducer = combineReducers({
	categories: categoriesReducer,
	basket: basketReducer,
	user: userReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'reset') {
		state = undefined;
	}
	return appReducer(state, action);
};

const preloadedState = {};
const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		// getDefaultMiddleware({
		// 	serializableCheck: false,
		// }).concat(logger),
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	reducer: rootReducer,
	preloadedState,
});

export default store;
