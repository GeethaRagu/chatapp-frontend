import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: null,
};

const userSearchSlice = createSlice({
  name: "searchuser",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      //console.log(action.payload);
      state.search = action.payload;
    },
    clearSearch : (state,action) =>{
        state.search = null;
    }
  },
});
export const { searchUser ,clearSearch} = userSearchSlice.actions;
export default userSearchSlice.reducer;
