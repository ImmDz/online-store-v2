import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api/api";
import { LOAD_STATUSES } from "src/types/loadStatuses";

export interface State {
  login: string;
  token: string;
  isAuth: boolean;
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  isAuth: localStorage.getItem("token") ? true : false,
  login: "",
  token: "",
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

const SLICE_NAME = "user";

const serverRequest = createAsyncThunk(SLICE_NAME, api.login);

const { reducer, actions: userActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(serverRequest.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(serverRequest.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
      state.isAuth = false;
    });
    builder.addCase(serverRequest.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.login = action.payload.login;
      state.isAuth = true;
      localStorage.setItem("login", state.login);
    });
  },
});

export { reducer };
export const actions = { ...userActions, serverRequest };
