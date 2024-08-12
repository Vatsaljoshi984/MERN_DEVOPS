import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBrand, createCategory } from './adminAPI';

const initialState = {
  value: 0,
  category:null,
  brand:null,
  status: 'idle',
};

export const createCategoryAsync = createAsyncThunk(
    'category/createCategory',
    async (data) => {
      const response = await createCategory(data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const createBrandAsync = createAsyncThunk(
    'category/createBrand',
    async (data) => {
      const response = await createBrand(data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category += action.payload;
      })
      .addCase(createBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brand += action.payload;
      });
  },
});

export const { increment } = adminSlice.actions;

export const selectCount = (state) => state.counter.value;

export default adminSlice.reducer;