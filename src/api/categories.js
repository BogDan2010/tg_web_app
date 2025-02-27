import { $host } from '../core/http';
import { setCategories } from '../store/slices/categoriesSlice';

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
