import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
};

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		setAddedItems(state, action) {
			state.data = action.payload;
		},
	},
});

export const { setAddedItems } = basketSlice.actions;

export default basketSlice.reducer;
