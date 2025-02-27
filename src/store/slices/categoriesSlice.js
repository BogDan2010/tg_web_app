import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories(state, action) {
			state.data = action.payload;
		},
	},
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
