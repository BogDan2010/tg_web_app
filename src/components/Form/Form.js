import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import styles from './Form.module.scss';

const Form = () => {
	const location = useLocation();
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [subject, setSubject] = useState('physical');
	const { tg } = useTelegram();

	const orderData = location.state.data;

	const onSendData = useCallback(async () => {
		// const data = {
		// 	city,
		// 	street,
		// 	subject,
		// };

		await fetch('https://81eb-68-183-154-121.ngrok-free.app/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		});

		// tg.sendData(JSON.stringify(orderData));
	}, [orderData]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Отпрвить данные',
		});
	}, []);

	useEffect(() => {
		if (!city || !street) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}, [city, street]);

	const onChangeCity = (e) => setCity(e.target.value);
	const onChangeStreet = (e) => setStreet(e.target.value);
	const onChangeSubject = (e) => setSubject(e.target.value);

	return (
		<div className={styles.form}>
			<h3>Введите ваши данные</h3>
			<label>Город:</label>
			<input
				value={city}
				onChange={onChangeCity}
				type='text'
				placeholder={'Город'}
				className={styles.input}
			/>
			<input
				value={street}
				onChange={onChangeStreet}
				type='text'
				placeholder={'Улица'}
				className={styles.input}
			/>
			<select
				value={subject}
				onChange={onChangeSubject}
				className={styles.select}
			>
				<option value={'physical'}>Физ. лицо</option>
				<option value={'legal'}>Юр. лицо</option>
			</select>
		</div>
	);
};

export default Form;
