import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuggestionBoxOpen: false,
};

const localStateSlice = createSlice({
  name: "localState",
  initialState,
  reducers: {
    setIsSuggestionBoxOpen: (state, action) => {
      state.isSuggestionBoxOpen = action.payload;
    },
    toggleSuggestionBox: (state) => {
      state.isSuggestionBoxOpen = !state.isSuggestionBoxOpen;
    },
  },
});

export const {
  setIsSuggestionBoxOpen,
  toggleSuggestionBox,
} = localStateSlice.actions;

export default localStateSlice.reducer;
