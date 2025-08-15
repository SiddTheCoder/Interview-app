import { createAsyncThunk } from "@reduxjs/toolkit";
import { setuser, setLoading, setMessage, setError } from "./userSlice";

export const getUser = createAsyncThunk("user/getUser", async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch("/api/auth/user");
    const user = await response.json();
    dispatch(setuser(user));
    
  } catch (error) {
    console.log("Error getting user:", error);
  } finally {
    dispatch(setLoading(false));
  }
});