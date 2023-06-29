// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from '../reducers/auth_reducers';

// export const store = configureStore({
//     reducer: {
//         auth: authReducer
//     }
// });

// // Get RootState and AppDispatch from store
// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth_reducers';
import drawerReducer from '../reducers/drawer_reducers';
import productReducer from '../reducers/product_reducers';

// Define your root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
  product: productReducer
});

// Define your persist config
const persistConfig = {
  key: 'root',
  version: 1.1,
  storage: storageSession,
};

// Define your persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define your store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.headers'],
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

// Get RootState and AppDispatch from store
export type RootState = ReturnType<typeof store.getState> & PersistPartial;
export type AppDispatch = typeof store.dispatch;

// persistor.purge().then(() => {
//   console.log('Data reset successful');
// }).catch(() => {
//   console.log('Data reset failed');
// });