import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ category }) => ({
				url: PRODUCTS_URL,
				params: { category },
			}),
		}),
		getProductDetails: builder.query({
			query: (id) => ({
				url: `${PRODUCTS_URL}/${id}`,
			}),
			keepUnusedDataFor: 5,
		}),
		createProduct: builder.mutation({
			query: (data) => ({
				url: PRODUCTS_URL,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),

		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data._id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: `/api/upload`,
				method: "POST",
				body: data,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCTS_URL}/${productId}`,
				method: "DELETE",
			}),
			providesTags: ["Product"],
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCTS_URL}/${data.productId}/reviews`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Product"],
		}),
		getTopProducts: builder.query({
			query: () => `${PRODUCTS_URL}/top`,
			keepUnusedDataFor: 5,
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useCreateReviewMutation,
	useGetTopProductsQuery,
} = productsApiSlice;
