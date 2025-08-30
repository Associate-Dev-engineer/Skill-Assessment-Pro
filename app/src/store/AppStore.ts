import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/actions/features/users"; // Import the reducer, not the slice

export const AppStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
