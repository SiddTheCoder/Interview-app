import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuggestionBoxOpen: false,
  isCameraOn: true,
  isMicOn: true, 
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
    setIsCameraOn: (state, action) => {
      state.isCameraOn = action.payload;
    },
    toggleCamera: (state) => {
      state.isCameraOn = !state.isCameraOn;
    },
    toggleMic: (state) => {
      state.isMicOn = !state.isMicOn;
    },
  },
});

export const {
  setIsSuggestionBoxOpen,
  toggleSuggestionBox,
  setIsCameraOn,
  toggleCamera,
  toggleMic
} = localStateSlice.actions;

export default localStateSlice.reducer;
