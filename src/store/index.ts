import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardListReducer from './cardListSlice';

export const store = configureStore({
  reducer: {
    list: cardListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
