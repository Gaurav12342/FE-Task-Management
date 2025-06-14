/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInterceptor";
import type { IUpdateTask, ICreateTaskInitialState } from "./types";

export const initialState: ICreateTaskInitialState = {
  loading: false,
  taskData: {},
  error: "",
};

export const updateTaskAPI: any = createAsyncThunk(
  "update-task",
  (obj: IUpdateTask) => {
    return axios
      .put("task/update", obj)
      .then((response) => {
        return response?.status === 201 && response?.data;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const updateTaskSlice = createSlice({
  name: "update-task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTaskAPI.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(updateTaskAPI.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.taskData = action.payload;
    });
    builder.addCase(updateTaskAPI.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default updateTaskSlice.reducer;
