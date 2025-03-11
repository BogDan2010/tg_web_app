// import crypto from 'crypto';
import { $host } from '../core/http';

// const createHash = async (password) => {
// 	let res = crypto
// 		.pbkdf2Sync(password, 'mysecretcodeword', 12000, 128, 'sha512')
// 		.toString('base64');
// 	return res;
// };

export const loginUser = (userData) => {
	return async (dispatch) => {
		console.log('userData', userData.password);
		let data = {
			login: userData.login,
			password: userData.password,
		};
		console.log('data', data);
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
