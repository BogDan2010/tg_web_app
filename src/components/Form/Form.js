import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPhoneNumber } from '../../helpers/formatPhoneNumber';
import { useTelegram } from '../../hooks/useTelegram';
import styles from './Form.module.scss';

const Form = () => {
	const products = useSelector((state) => state.basket.data);
	const totalPrice = useSelector((state) => state.basket.totalPrice);
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [house, setHouse] = useState('');
	const [entrance, setEntrance] = useState('');
	const [payment, setPayment] = useState('cash');
	const [phone, setPhone] = useState('');
	const [time, setTime] = useState('');
	const [humanCount, setHumanCount] = useState('');
	const [comment, setComment] = useState('');
	const { tg, queryId, initDataUnsafe } = useTelegram();

	// const orderData = location?.state?.data;

	// console.log('orderData', addedItems);

	const onSendData = useCallback(async () => {
		tg.MainButton.hide();
		let dataOrder = {
			seats: Number(humanCount) + 1, // количество персон
			addressId: '64dc7812d6288b1298d8619c', // адрес
			firstName: 'Тестовый пользователь', //имя пользователя
			payType: payment, // способ оплаты
			phone: phone, // телефон
			comment: `Тестовый заказ! Доставить к: [${time}, ${time}]. ${comment.replace(
				/\r?\n/g,
				''
			)}`,
			dateDelivery: [time, time], // время доставки
			userId: '64cf7caed6288b1298d7af8b',
			sum: 1000, // сдача с...
			items: products,
			bonusSum: '',
			sumCash: '',
			sumCard: '',
			sumCreditCard: '',
		};
		const sendData = {
			orderData: {
				products,
				queryId,
				initDataUnsafe,
				totalPrice,
			},
			userData: {
				seats: Number(humanCount) + 1, // количество персон
				addressId: '64dc7812d6288b1298d8619c', // адрес
				firstName: 'Тестовый пользователь', //имя пользователя
				payType: payment, // способ оплаты
				phone: phone, // телефон
				comment: `Тестовый заказ! Доставить к: [${time.split(
					':'
				)}]. ${comment.replace(/\r?\n/g, '')}`,
				dateDelivery: `[${time.split(':')}]`, // время доставки
				userId: '64cf7caed6288b1298d7af8b',
				sum: '', // сдача с...
				items: products,
				bonusSum: '',
				sumCash: '',
				sumCard: '',
				sumCreditCard: '',
				// city,
				// street,
				// house,
				// entrance,
				// payment,
				// phone,
				// time,
				// humanCount: String(Number(humanCount) + 1),
				// comment: `Тестовый заказ! ${comment}`,

				// "_id": "64cf7caed6288b1298d7af8b",
			},
		};
		// console.log('sendData', sendData);
		await fetch('https://8bb0-68-183-154-121.ngrok-free.app/web-data-order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(sendData),
		});

		// tg.sendData(JSON.stringify(orderData));
	}, [
		products,
		city,
		street,
		house,
		entrance,
		payment,
		phone,
		time,
		humanCount,
		comment,
	]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);

	useEffect(() => {
		tg.MainButton.setParams({
			text: 'Отправить заказ',
		});
	}, []);

	useEffect(() => {
		if (!city || !street || !house || !phone || !time) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	}, [city, street, house, phone, time]);

	const onChangeCity = (e) => setCity(e.target.value);
	const onChangeStreet = (e) => setStreet(e.target.value);
	const onChangeHouse = (e) => setHouse(e.target.value);
	const onChangeEntrance = (e) => setEntrance(e.target.value);
	const onChangePayment = (e) => setPayment(e.target.value);
	const onChangePhone = (e) => {
		const input = e.target.value;
		const formattedPhone = formatPhoneNumber(input); // Форматируем номер

		setPhone(formattedPhone);
	};
	const onChangeTime = (e) => setTime(e.target.value);
	const onChangeHumanCount = (e) => setHumanCount(e.target.value);
	const onChangeComment = (e) => setComment(e.target.value);

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
						type='text'
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
				<label>Номер телефона:</label>
				<input
					value={phone}
					onChange={onChangePhone}
					type='tel'
					className={styles.input}
				/>
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

			<div className={styles.formItem}>
				<label>Доставка ко времени:</label>
				<input
					value={time}
					onChange={onChangeTime}
					type='time'
					className={styles.input}
				/>
			</div>
			<div className={styles.formItem}>
				<label>Количество персон:</label>
				<select
					onChange={onChangeHumanCount}
					value={humanCount}
					className={styles.select}
				>
					{Array.from({ length: 5 }).map((_, i) => {
						return <option value={String(i)}>{i + 1}</option>;
					})}
				</select>
			</div>
			<div className={styles.formItem}>
				<label>Комментарий:</label>
				<textarea
					value={comment}
					onChange={onChangeComment}
					className={styles.input}
					rows='2'
				/>
			</div>
		</div>
	);
};

export default Form;
