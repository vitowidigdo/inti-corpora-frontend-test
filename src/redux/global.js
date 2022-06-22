import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    posts: [],
    users: [],
    comments: [],
    pieChart: [],
    lineChart: [],
    barChart: [],
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
    userPieCharts: (state, { payload }) => {
      state.pieChart = payload;
    },
    userLineCharts: (state, { payload }) => {
      state.lineChart = payload;
    },
    userBarCharts: (state, { payload }) => {
      state.barChart = payload;
    },
  },
});

export const actionsGlobal = globalSlice.actions;

export default globalSlice.reducer;
