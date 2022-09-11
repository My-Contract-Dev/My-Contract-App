import { configureStore } from '@reduxjs/toolkit';
import auth from './features/auth';
import contractsList from './features/contractsList';

export const store = configureStore({
  reducer: {
    auth,
    contractsList,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
