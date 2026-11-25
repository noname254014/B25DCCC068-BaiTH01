import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Product } from "../../types";

export type ProductsStatus = "idle" | "loading" | "succeeded" | "failed";

interface ProductsState {
  items: Product[];
  status: ProductsStatus;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;
  return (
    typeof product.id === "number" &&
    typeof product.title === "string" &&
    typeof product.price === "number" &&
    typeof product.description === "string" &&
    typeof product.category === "string" &&
    typeof product.image === "string"
  );
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string; state: RootState }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      return rejectWithValue(`Không thể tải sản phẩm (HTTP ${response.status}).`);
    }

    const responseData: unknown = await response.json();
    if (!Array.isArray(responseData)) {
      return rejectWithValue("Dữ liệu sản phẩm từ máy chủ không hợp lệ.");
    }

    const records: unknown[] = responseData;
    const products = records.filter(isProduct);

    if (products.length !== records.length) {
      return rejectWithValue("Một số sản phẩm nhận được không đúng định dạng.");
    }

    return products;
  } catch {
    return rejectWithValue("Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.");
  }
}, {
  condition: (_, { getState }) => getState().products.status !== "loading",
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Đã xảy ra lỗi không xác định.";
      });
  },
});

export default productsSlice.reducer;
