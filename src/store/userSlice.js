import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		token: '',
		image: '',
		username: '',
		email: '',
		password: '',
	},
	reducers: {
		onTokenAdd(state, action) {
			return {
				token: action.payload.token,
				username: action.payload.username,
				image: action.payload.image,
			};
		},
		onDeleteToken() {
			return {
				token: '',
				image: '',
				username: '',
			};
		},
		onChangeInfo(state, action) {
			return {
				username: action.payload.username,
				email: action.payload.email,
				image: action.payload.image,
			};
		},
	},
});

export const { onTokenAdd, onDeleteToken, setData, onChangeInfo } =
	userSlice.actions;
export default userSlice.reducer;
