import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import recentlyViewedReducer from "./slices/recentlyViewedSlice";
import favoriteProductsReducer from "./slices/favoriteProductsSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: cartSliceReducer,
		auth: authReducer,
		recentlyViewed: recentlyViewedReducer,
		favoriteProducts: favoriteProductsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
