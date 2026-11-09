import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import your reducers here (create them next)
import authReducer from './slices/authSlice';           // we'll create later
import hotelReducer from './slices/hotelSlice';
import requestReducer from './slices/requestSlice';     // for offline requests

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'requests'],   // persist login + queued requests
  // blacklist: ['temporaryData'] if needed
};

const rootReducer = combineReducers({
  auth: authReducer,
  hotel: hotelReducer,
  requests: requestReducer,
  // add more slices later: cart, reservations, etc.
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;