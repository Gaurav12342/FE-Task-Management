/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInterceptor";

export const initialState: any = {
  loading: false,
  data: [],
  error: "",
};

export const fetchTaskListAPI: any = createAsyncThunk(
  "fetch-task-list",
  ({
    page = 1,
    limit = 5,
    search,
  }: {
    page: number;
    limit: number;
    search?: string;
  }) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search?.trim()) {
      params.append("search", search);
    }

    return axios
      .get(`task/lists?${params.toString()}`)
      .then((response) => {
        if (response?.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        return error;
      });
  }
);

export const getAllTaskSlice = createSlice({
  name: "fetch-task-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTaskListAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTaskListAPI.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTaskListAPI.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default getAllTaskSlice.reducer;
