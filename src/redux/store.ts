/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import signInSlice from "./Auth/SignIn";
import signUpSlice from "./Auth/SignUp";
import getAllTaskSlice from "./Task/listsTaskSlice";
import createTaskSlice from "./Task/createTaskSlice";
import updateTaskSlice from "./Task/updateTaskSlice";
import deleteTaskSlice from "./Task/deleteTaskSlice";

export const store: any = configureStore({
  reducer: {
    signIn: signInSlice,
    signUp: signUpSlice,
    taskLists: getAllTaskSlice,
    createdTask: createTaskSlice,
    updateTask: updateTaskSlice,
    deleteTask: deleteTaskSlice,
  },
});
