import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import styles from './Form.module.scss';

const Form = () => {
	const location = useLocation();
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');
	const [entrance, setEntrance] = useState('');
	const [payment, setPayment] = useState('cash');
	const { tg } = useTelegram();

	const orderData = location?.state?.data;

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
		if (!city || !street || !house) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}, [city, street, house]);

	const onChangeCity = (e) => setCity(e.target.value);
	const onChangeStreet = (e) => setStreet(e.target.value);
	const onChangeHouse = (e) => setHouse(e.target.value);
	const onChangeEntrance = (e) => setEntrance(e.target.value);
	const onChangePayment = (e) => setPayment(e.target.value);

	return (
		<div className={styles.form}>
			<h3>Введите ваши данные</h3>
			<div className={styles.formItem}>
				<label>Город:</label>
				<input
					value={city}
					onChange={onChangeCity}
					type='text'
					className={styles.input}
				/>
			</div>
			<div className={styles.formItem}>
				<label>Улица:</label>
				<input
					value={street}
					onChange={onChangeStreet}
					type='text'
					className={styles.input}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className={styles.formItem}>
					<label>Дом:</label>
					<input
						value={house}
						onChange={onChangeHouse}
						type='number'
						className={styles.input}
						style={{ width: '45%', marginRight: 5 }}
					/>
				</div>
				<div className={styles.formItem}>
					<label>Подъезд:</label>
					<input
						value={entrance}
						onChange={onChangeEntrance}
						type='number'
						className={styles.input}
						style={{ width: '45%' }}
					/>
				</div>
			</div>
			<div className={styles.formItem}>
				<label>Оплата:</label>
				<select
					value={payment}
					onChange={onChangePayment}
					className={styles.select}
				>
					<option value={'card_on_delivery'}>Картой курьеру</option>
					<option value={'cash'}>Наличными</option>
				</select>
			</div>
		</div>
	);
};

export default Form;
