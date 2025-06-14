/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInterceptor";
import type { ICreateTask, ICreateTaskInitialState } from "./types";

export const initialState: ICreateTaskInitialState = {
  loading: false,
  taskData: {},
  error: "",
};

export const createTaskAPI: any = createAsyncThunk(
  "create-task",
  (obj: ICreateTask) => {
    return axios
      .post("task/create", obj)
      .then((response) => {
        return response?.status === 201 && response?.data;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const createTaskSlice = createSlice({
  name: "create-task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTaskAPI.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(createTaskAPI.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.taskData = action.payload;
    });
    builder.addCase(createTaskAPI.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default createTaskSlice.reducer;
