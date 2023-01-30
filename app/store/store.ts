import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Slices imports
 */
import passwordSlice from './reducers/passwordSlice';
import toastSlice from './reducers/toastSlice';
import settingsSlice from './reducers/settingsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: [
    'passwords',
  ],
};

const reducer = persistReducer(
    persistConfig,
    combineReducers({
      passwords: passwordSlice.reducer,
      toast: toastSlice.reducer,
      settings: settingsSlice.reducer,
    }),
);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

