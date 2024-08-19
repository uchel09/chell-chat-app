import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import socketSlice from "./slices/socketSlice";
import componentSlice from "./slices/componentSlice";
import conversationsSlice from "./slices/conversationsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    socket: socketSlice,
    component: componentSlice,
    conversation: conversationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
