import { $authHost } from '../core/http';

export const createOrder = (order) => {
	return async (dispatch) => {
		try {
			const { data } = await $authHost.post(`order`, order);

			console.log('data createOrder', data);
		} catch (error) {
			console.log('error createOrder', error);
		}
	};
};
