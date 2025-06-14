/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInterceptor";
import type { ICreateTaskInitialState } from "./types";

export const initialState: ICreateTaskInitialState = {
  loading: false,
  taskData: {},
  error: "",
};

export const deleteTaskAPI: any = createAsyncThunk(
  "delete-task",
  (id: string) => {
    return axios
      .delete(`task/delete/${id}`)
      .then((response) => {
        return response?.status === 200 && response?.data;
      })
      .catch((error) => {
        return error;
      });
  }
);

export const deleteTaskSlice = createSlice({
  name: "delete-task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTaskAPI.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(deleteTaskAPI.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.taskData = action.payload;
    });
    builder.addCase(deleteTaskAPI.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default deleteTaskSlice.reducer;
