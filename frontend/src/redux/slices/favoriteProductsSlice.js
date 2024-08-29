// favoriteProductsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: JSON.parse(localStorage.getItem("favoriteProducts")) || [],
};

const favoriteProductsSlice = createSlice({
	name: "favoriteProducts",
	initialState,
	reducers: {
		addToFavorites: (state, action) => {
			const product = action.payload;
			if (!state.products.find((p) => p._id === product._id)) {
				state.products.push(product);
				// Update localStorage
				
				localStorage.setItem(
					"favoriteProducts",
					JSON.stringify(state.products)
				);
			}
		},
		removeFromFavorites: (state, action) => {
			const productId = action.payload;
			state.products = state.products.filter((p) => p._id !== productId);
			console.log("remove");
			// Update localStorage
			localStorage.setItem("favoriteProducts", JSON.stringify(state.products));
		},
	},
});

export const { addToFavorites, removeFromFavorites } =
	favoriteProductsSlice.actions;

export default favoriteProductsSlice.reducer;
