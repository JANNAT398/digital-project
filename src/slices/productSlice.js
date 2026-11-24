import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProductsFromApi } from '../services/productApi'
import { products as initialProducts, categories as initialCategories, setProductsCache } from '../data/products'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    const result = await fetchProductsFromApi()
    if (result.success && result.products?.length > 0) {
      // Also sync module-level cache for non-React/static helpers
      setProductsCache(result.products)
      return result
    }
    return rejectWithValue(result.error || 'Failed to fetch products')
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    categories: initialCategories,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
      setProductsCache(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload.products?.length > 0) {
          state.items = action.payload.products
        }
        if (action.payload.categories?.length > 0) {
          // Merge API categories with any default categories
          state.categories = action.payload.categories
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  },
})

export const { setProducts } = productSlice.actions

export const selectAllProducts = (state) => state.products.items
export const selectProductCategories = (state) => state.products.categories
export const selectProductStatus = (state) => state.products.status
export const selectProductError = (state) => state.products.error
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === Number(id))

export default productSlice.reducer
