import crypto from 'crypto';
import { $host } from '../core/http';
import config from './config';

const createHash = (password) => {
	let res = crypto
		.pbkdf2Sync(
			password,
			config.secret,
			config.crypto.hash.iterations,
			config.crypto.hash.length,
			'sha512'
		)
		.toString('base64');

	return res;
};

export const loginUser = (userData) => {
	let data = {
		login: userData.login,
		password: createHash(userData.password),
	};
	return async (dispatch) => {
		try {
			const auth = await $host.post('/user/auth', data);
			console.log('auth', auth);
		} catch (error) {
			console.log('loginUser error:   ', error);
		}
	};

	// if (auth.data) {
	// 	try {
	// 		await localStorage.setItem('@@token', auth.data.token);
	// 		const user = await axios({
	// 			method: 'post',
	// 			url: '/user/login',
	// 			data: {
	// 				phone: userData.phone,
	// 				password: userData.password,
	// 			},
	// 			headers: {
	// 				Authorization: `Bearer ${auth.data.token}`,
	// 			},
	// 		});

	// 		return user.data;
	// 	} catch (e) {

	// 			console.log('loginUser error',e);

	// 		}
	// 	}
};
