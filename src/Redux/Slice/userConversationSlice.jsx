import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  error: null,
  loading: false,
  selectedConversation: null,
};

const userConversationSlice = createSlice({
  name: "userConversation",
  initialState,
  reducers: {
    displayusers: (state, action) => {
      state.users = action.payload;
    },
    selectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    clearConversation : (state) =>{
      state.selectedConversation = null;
    }
  },
});

export const { displayusers, selectedConversation , clearConversation } =
  userConversationSlice.actions;
export default userConversationSlice.reducer;
