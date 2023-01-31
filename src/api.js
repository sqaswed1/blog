import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
	tagTypes: ['Posts', 'User', 'onePost'],
	endpoints: (build) => ({
		getPosts: build.query({
			query: ({ offset, token }) => ({
				url: `/articles`,
				headers: {
					Authorization: token ? `Token ${token}` : undefined,
				},
				params: {
					offset,
					limit: 5,
				},
			}),
			providesTags: () => ['Posts', 'onePost'],
		}),
		getOnePost: build.query({
			query: ({ slug, token }) => ({
				url: `/articles/${slug}`,
				headers: {
					Authorization: token ? `Token ${token}` : undefined,
				},
			}),
			providesTags: () => ['onePost', 'Posts'],
		}),
		registerUser: build.mutation({
			query: ({ email, password, username }) => ({
				url: '/users',
				method: 'POST',
				body: { user: { email, password, username } },
			}),
		}),
		loginUser: build.mutation({
			query: ({ email, password }) => ({
				url: '/users/login',
				method: 'POST',
				body: { user: { email, password } },
			}),
		}),
		getLoggedUser: build.query({
			query: (token) => ({
				url: '/user',
				headers: {
					Authorization: `Token ${token}`,
				},
			}),

			invalidatesTags: ['User'],
		}),
		updateUser: build.mutation({
			query: ({ dataInfo, token }) => ({
				url: '/user',
				method: 'PUT',
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: { user: dataInfo },
			}),
			invalidatesTags: ['User'],
		}),
		createArticle: build.mutation({
			query: ({ articleInfo, token }) => ({
				url: '/articles',
				method: 'POST',
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: { article: articleInfo },
			}),
			invalidatesTags: ['Posts'],
		}),
		updateArticle: build.mutation({
			query: ({ articleInfo, token, slug }) => ({
				url: `/articles/${slug}`,
				method: 'PUT',
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: { article: articleInfo },
			}),
			invalidatesTags: ['Posts', 'onePost'],
		}),
		deleteArticle: build.mutation({
			query: ({ token, slug }) => ({
				url: `/articles/${slug}`,
				method: 'DELETE',
				headers: {
					Authorization: `Token ${token}`,
				},
			}),
			invalidatesTags: ['Posts', 'onePost'],
		}),
		setFavorited: build.mutation({
			query: ({ slug, token, method }) => ({
				url: `/articles/${slug}/favorite`,
				method,
				headers: {
					Authorization: `Token ${token}`,
					'Content-Type': 'application/json;charset=utf-8',
				},
			}),
			invalidatesTags: ['onePost', 'Posts'],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetOnePostQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useUpdateUserMutation,
	useGetLoggedUserQuery,
	useCreateArticleMutation,
	useUpdateArticleMutation,
	useSetFavoritedMutation,
	useDeleteArticleMutation,
} = baseApi;
