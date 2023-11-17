import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemState {
  item: null | { name: string; price: number; emoji: string };
}

const initialState: ItemState = {
  item: null,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (
      state,
      action: PayloadAction<{
        name: string;
        price: number;
        emoji: string;
      } | null>
    ) => {
      state.item = action.payload;
    },
  },
});

export const { actions, reducer } = itemSlice;

export const selectItem = (state: { item: ItemState }) => state.item.item;

export default itemSlice.reducer;
