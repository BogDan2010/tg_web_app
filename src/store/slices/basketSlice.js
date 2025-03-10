import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
	totalPrice: 0,
};

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		setAddedItems(state, action) {
			state.data = action.payload;
		},
		setTotalPrice(state, action) {
			state.totalPrice = action.payload;
		},
	},
});

export const { setAddedItems, setTotalPrice } = basketSlice.actions;

export default basketSlice.reducer;
