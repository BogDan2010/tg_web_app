import { $host } from '../core/http';
import {
	setCategories,
	setDataProducts,
} from '../store/slices/categoriesSlice';

export const getAllCategories = () => {
	return async (dispatch) => {
		try {
			let res = await $host.get('/categories');

			console.log('res', res);
			if (res.data) dispatch(setCategories(res.data));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const getCategoryProductItems = (id) => {
	return async (dispatch) => {
		try {
			const res = await $host.get(`categories/${id}/items_all`);

			console.log('getCategoryProductItems data', res.data);
			if (res.data) dispatch(setDataProducts(res.data));
		} catch (error) {
			console.log('error', error);
		}
	};
};
