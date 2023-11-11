import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CelebrityState {
  name: null | string;
  netWorth: null | number;
}

const initialState: CelebrityState = {
  name: null,
  netWorth: null,
};

const celebritySlice = createSlice({
  name: "celebrity",
  initialState,
  reducers: {
    setCelebrityNetWorth: (state, action: PayloadAction<number | null>) => {
      state.netWorth = action.payload;
    },
    setCelebrityName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
    },
  },
});

export const { actions, reducer } = celebritySlice;

export const selectCelebrityName = (state: { celebrity: CelebrityState }) =>
  state.celebrity.name;

export const selectCelebrityNetWorth = (state: { celebrity: CelebrityState }) =>
  state.celebrity.netWorth;

export default celebritySlice.reducer;
