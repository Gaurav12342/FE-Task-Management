/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { ISignUpInitialState, ISignUpPayload } from "./types";

const url = import.meta.env.VITE_API_URL;
const initialState: ISignUpInitialState = {
  loading: false,
  data: {},
  error: "",
};
export const signUpAPI: any = createAsyncThunk(
  "sign-up",
  (obj: ISignUpPayload) => {
    return axios
      .post(`${url}user/sign-up`, obj)
      .then((res) => {
        if (res?.status === 201) {
          return res?.data?.data;
        }
      })
      .catch();
  }
);

const signUpSlice = createSlice({
  name: "sign-up",
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler.addCase(signUpAPI.pending, (state: any) => {
      state.loading = true;
      state.data = {};
    });

    buidler.addCase(signUpAPI.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
      state.loading = false;
    });

    buidler.addCase(signUpAPI.rejected, (state: any, action: any) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    });
  },
});

export default signUpSlice.reducer;
