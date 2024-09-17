import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: 'include',
  }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: '/post-review',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: 'Review', id: postId },
      ],
    }),
    getReviewsCount: builder.query({
      query: () => ({
        url: '/total-reviews',
      }),
    }),
    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result) =>
      result? [{type: 'Review', id: result[0]?.email}] : [],
    }),
  }),
});

export const { usePostReviewMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery } = reviewsApi;

export default reviewsApi;
