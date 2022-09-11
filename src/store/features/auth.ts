import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  authorized: boolean;
  firebaseUser?: FirebaseAuthTypes.User;
}

const initialState: AuthState = {
  authorized: false,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    authorizationSuccess(state, action: PayloadAction<FirebaseAuthTypes.User>) {
      state.authorized = true;
      state.firebaseUser = action.payload;
    },
  },
});

export const { authorizationSuccess } = authSlice.actions;

export default authSlice.reducer;
