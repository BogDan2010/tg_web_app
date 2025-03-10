import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import styles from './Auth.module.scss';

const Auth = () => {
	const navigate = useNavigate();
	const { tg } = useTelegram();
	const orderData = useSelector((state) => state.basket.data);

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	console.log('Auth orderData', orderData);

	const onSendData = () => {
		navigate('/basket', { state: { data: orderData } });
	};

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Авторизоваться',
		});
	}, []);

	useEffect(() => {
		if (!login || !password) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}, [login, password]);

	const onChangeLogin = (e) => setLogin(e.target.value);
	const onChangePassword = (e) => setPassword(e.target.value);

	return (
		<div className={styles.form}>
			<h3>Введите ваши данные</h3>
			<div className={styles.formItem}>
				<label>Логин:</label>
				<input
					value={login}
					onChange={onChangeLogin}
					type='text'
					className={styles.input}
				/>
			</div>
			<div className={styles.formItem}>
				<label>Пароль:</label>
				<input
					value={password}
					onChange={onChangePassword}
					type='password'
					className={styles.input}
				/>
			</div>
		</div>
	);
};

export default Auth;
