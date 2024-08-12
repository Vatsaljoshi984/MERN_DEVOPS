import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchProductById, fetchProductsByFilters, fetchProductsByFiltersAdmin, updateProduct, updateRatingProduct } from './ProductListAPI'

const initialState = {
  products: [],
  adminProducts: [],
  category: [],
  brand: [],
  status: 'idle',
  totalItems: 0,
  adminTotalItems: 0,
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (id) => {
    const response = await createProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'cart/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateRatingProductAsync = createAsyncThunk(
  'cart/updateRatingProduct',
  async (update) => {
    const response = await updateRatingProduct(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ search, filter, sort, pagination }) => {
    const response = await fetchProductsByFilters({ search, filter, sort, pagination });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAdminAsync = createAsyncThunk(
  'product/fetchProductsByFiltersAdmin',
  async ({ search,filter, sort, pagination }) => {
    const response = await fetchProductsByFiltersAdmin({ search,filter, sort, pagination });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brand = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.unshift(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(updateRatingProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRatingProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.products[index] = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFiltersAdminAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAdminAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.adminProducts = action.payload.products;
        state.adminTotalItems = action.payload.totalItems;
      });
  },
});

export const { increment } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectedProductById = (state) => state.product.selectedProduct;
export const selectAllCategories = (state) => state.product.category;
export const selectAllBrands = (state) => state.product.brand;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAdminTotalItems = (state) => state.product.adminTotalItems;
export const selectProductStatus = (state) => state.product.status;


export default ProductSlice.reducer;