import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CelebrityState {
  celebrity: null | {
    name: string;
    net_worth: number;
    occupation: string[];
  };
}

const initialState: CelebrityState = {
  celebrity: null,
};

const celebritySlice = createSlice({
  name: "celebrity",
  initialState,
  reducers: {
    setCelebrity: (
      state,
      action: PayloadAction<{
        name: string;
        net_worth: number;
        occupation: string[];
      } | null>
    ) => {
      state.celebrity = action.payload;
    },
  },
});

export const { actions, reducer } = celebritySlice;

export const selectCelebrity = (state: { celebrity: CelebrityState }) =>
  state.celebrity.celebrity;

export default celebritySlice.reducer;
