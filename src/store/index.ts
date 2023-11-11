import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import celebrityReducer from "./celebritySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    celebrity: celebrityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
