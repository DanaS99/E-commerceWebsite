import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams({
          category: category || '',
          color: color || '',
          minPrice: minPrice || 0,
          maxPrice: maxPrice || 0,
          page: page.toString(),
          limit: limit.toString(),
        }).toString();
        return `/${queryParams}`;
      },
      provideTags: ['Products'],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/create-product',
        method: 'POST',
        body: newProduct,
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),

    fetchRelatedProducts: builder.query({
      query: (id) => `related/${id}`
    }),
    updateProduct: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/update-product/${id}`,
        method: 'PATCH',
        body: rest,
        credentials: 'include',
      })
    })

  }),
});

export const {} = productsApi;
