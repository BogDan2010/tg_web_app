import React, { useEffect, useState } from 'react';

import { useTelegram } from '../../hooks/useTelegram';
import styles from './Form.module.scss';

const Form = () => {
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [subject, setSubject] = useState('physical');
	const { tg } = useTelegram();

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
