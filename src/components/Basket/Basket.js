import React, { useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import Header from '../Header/Header';
import OrderList from '../OrderList/OrderList';
import styles from './Basket.module.scss';

const Basket = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const orderData = location?.state?.data;
	const isAuth = useSelector((state) => state.user.data);
	const { tg } = useTelegram();

	console.log('isAuth', isAuth, orderData);

	const onSendData = useCallback(async () => {
		if (!isAuth) return navigate('/auth');
		// const data = {
		// 	city,
		// 	street,
		// 	subject,
		// };
		return navigate('/form', { state: { data: orderData } });
		// await fetch('https://36b6-91-212-198-136.ngrok-free.app/web-data', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(orderData),
		// });
	}, [orderData, isAuth]);

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

			<OrderList orderData={orderData} />
		</div>
	);
};

export default Basket;
