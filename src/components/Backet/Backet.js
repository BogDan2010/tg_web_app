import React from 'react';

import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Backet.module.scss';

const Backet = () => {
	const location = useLocation();
	const orderData = location?.state?.data;
	return (
		<div className={styles.container}>
			<Header title={'Ваш заказ'} titleButton={'Редактировать'} />
			<span className={styles.totalPrice}>{orderData.totalPrice}</span>
		</div>
	);
};

export default Backet;
