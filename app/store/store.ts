import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import {encryptTransform} from 'redux-persist-transform-encrypt';

import passwordSlice from './reducers/passwordSlice';
import toastSlice from './reducers/toastSlice';
import settingsSlice from './reducers/settingsSlice';
import tagSlice from './reducers/tagSlice';
import logSlice from './reducers/logSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blackList: ['toast'],

  // transforms: [
  //   encryptTransform({
  //     secretKey: 'my-super-password', // Change this for production
  //     onError: function(error) {
  //       console.log('Encrypt transform error', error);
  //     },
  //   }),
  // ],
};

const reducer = persistReducer(
    persistConfig,
    combineReducers({
      passwords: passwordSlice.reducer,
      toast: toastSlice.reducer,
      settings: settingsSlice.reducer,
      tags: tagSlice.reducer,
      logs: logSlice.reducer,
    }),
);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    }),
});

export const persistor = persistStore(store) as any; // Fix the type error

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

