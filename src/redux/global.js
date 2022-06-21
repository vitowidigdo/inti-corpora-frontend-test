import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    posts: [],
    users: [],
    comments: [],
  },
  reducers: {
    userPost: (state, { payload }) => {
      state.posts = payload;
    },
    userList: (state, { payload }) => {
      state.users = payload;
    },
    userComments: (state, { payload }) => {
      state.comments = payload;
    },
  },
});

export const actionsGlobal = globalSlice.actions;

export default globalSlice.reducer;
