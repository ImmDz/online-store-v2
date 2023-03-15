import { LOAD_STATUSES } from "src/types/loadStatuses";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category, Good } from "src/types/general";
import { getPopularCategories } from "src/api/api";

export interface State {
  loadStatus: LOAD_STATUSES;
  category: Category | null;
  goods: Good[];
}

const initialState: State = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  category: null,
  goods: [],
};

const SLICE_NAME = "popular_categories";

const serverRequest = createAsyncThunk(SLICE_NAME, getPopularCategories);

const { reducer, actions: popularActions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(serverRequest.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(serverRequest.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR;
    });
    builder.addCase(serverRequest.fulfilled, (state, action) => {
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.category = action.payload.category;
      state.goods = action.payload.items;
    });
  },
});

export { reducer };
export const actions = { ...popularActions, serverRequest };
