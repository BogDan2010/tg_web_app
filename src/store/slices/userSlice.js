import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setDataUser(state, action) {
			state.data = action.payload;
		},
	},
});

export const { setDataUser } = userSlice.actions;

export default userSlice.reducer;
