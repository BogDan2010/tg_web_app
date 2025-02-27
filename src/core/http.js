import axios from 'axios';

export const GARRYS_API_URL = 'https://sg.tab-is.com/';

const $host = axios.create({
	baseURL: GARRYS_API_URL,
});

const $authHost = axios.create({
	baseURL: GARRYS_API_URL,
	headers: {
		'Content-Type': `multipart/form-data`,
		Accept: 'application/json',
		'Accept-Encoding': ['gzip', 'deflate', 'br'],
		Connection: 'keep-alive',
	},
});

const getToken = async () => {
	try {
		return await localStorage.getItem('@storage_Token');
	} catch (e) {
		// error reading value
	}
};

const authInterceptor = async (config) => {
	let token = await getToken();

	config.headers = {
		Authorization: `Bearer ${token}`,
	};
	return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $authHost, $host };
