import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import addContract from './features/addContract';
import auth from './features/auth';
import contractsList from './features/contractsList';
import refreshing from './features/refreshing';
import paywall from './features/paywall';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['refreshing', 'paywall', 'addContract'],
};

const rootReducer = combineReducers({
  auth,
  contractsList,
  addContract,
  refreshing,
  paywall,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
