import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
	dataProducts: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories(state, action) {
			state.data = action.payload;
		},
		setDataProducts(state, action) {
			state.dataProducts = action.payload;
		},
	},
});

export const { setCategories, setDataProducts } = categoriesSlice.actions;

export default categoriesSlice.reducer;
