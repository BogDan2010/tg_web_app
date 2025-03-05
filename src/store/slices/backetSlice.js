import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
};

const backetSlice = createSlice({
	name: 'backet',
	initialState,
	reducers: {
		setAddedItems(state, action) {
			state.data = action.payload;
		},
	},
});

export const { setAddedItems } = backetSlice.actions;

export default backetSlice.reducer;
