/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { ISignInInitialState, ISignInPayload } from "./types";

const baseUrl = import.meta.env.VITE_API_URL;

const initialState: ISignInInitialState = {
  loading: false,
  data: {},
  error: "",
};

export const signInAPI: any = createAsyncThunk(
  "sign-in",
  (obj: ISignInPayload) => {
    return axios
      .post(`${baseUrl}user/sign-in`, obj)
      .then((res) => {
        if (res?.status === 200) {
          return res?.data;
        }
      })
      .catch();
  }
);

const signInSlice = createSlice({
  name: "sign-in",
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler.addCase(signInAPI.pending, (state: any) => {
      state.loading = true;
      state.data = {};
    });

    buidler.addCase(signInAPI.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
      state.loading = false;
    });

    buidler.addCase(signInAPI.rejected, (state: any, action: any) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    });
  },
});

export default signInSlice.reducer;
