import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import celebrityReducer from "./celebritySlice";
import itemReducer from "./itemSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    celebrity: celebrityReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
