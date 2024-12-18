import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  error: null,
  loading: false,
};

const userMessageSlice = createSlice({
  name: "sendmessage",
  initialState,
  reducers: {
    sendmessage: (state, action) => {
      //console.log(action.payload);
      state.messages = [...state.messages, action.payload];
      state.loading = false;
      state.error = null;
    },
    getmessagestart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getmessage: (state, action) => {
      //console.log(action.payload);
      //state.messages = [...state.messages,action.payload];
      state.messages = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearmessage : (state) =>{
      state.messages = null;
    }
  },
});
export const { sendmessage, getmessage, getmessagestart , clearmessage} =
  userMessageSlice.actions;
export default userMessageSlice.reducer;
