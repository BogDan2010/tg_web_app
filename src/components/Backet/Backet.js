import React, { useCallback, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import Header from '../Header/Header';
import styles from './Backet.module.scss';

const Backet = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const orderData = location?.state?.data;
	const { tg } = useTelegram();

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
	}, [orderData]);

	useEffect(() => {
		const handleBack = () => {
			navigate('/'); // Навигация назад
		};

		// Показываем кнопку при монтировании
		tg.BackButton.show();

		// Добавляем обработчик
		tg.BackButton.onClick(handleBack);

		// Убираем кнопку и обработчик при демонтировании
		return () => {
			tg.BackButton.offClick(handleBack);
			tg.BackButton.hide();
		};
	}, [navigate]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);

	// useEffect(() => {
	// 	tg.MainButton.setParams({
	// 		text: 'Отпрвить данные',
	// 	});
	// }, []);

	return (
		<div className={styles.container}>
			<Header title={'Ваш заказ'} titleButton={'Редактировать'} />
			<span className={styles.totalPrice}>{orderData?.totalPrice}</span>
		</div>
	);
};

export default Backet;
