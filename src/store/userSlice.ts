import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  netWorth: null | number;
}

const initialState: UserState = {
  netWorth: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNetWorth: (state, action: PayloadAction<number | null>) => {
      state.netWorth = action.payload;
    },
  },
});

export const { actions, reducer } = userSlice;

export const selectNetWorth = (state: { user: UserState }) =>
  state.user.netWorth;

export default userSlice.reducer;
