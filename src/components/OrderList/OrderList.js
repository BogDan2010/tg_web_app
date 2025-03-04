import React from 'react';

import OrderListItem from '../OrderListItem/OrderListItem';
import styles from './OrderList.module.scss';

const OrderList = ({ orderData }) => {
	// const orderData = [
	// 	{
	// 		comment: ' ',
	// 		count: 3,
	// 		id: '63aeedd20f739848572c1284',
	// 		image: 'items/63aeedd20f739848572c1284.png',
	// 		name: 'ДОБРЫЙ Палпи МАНГО АНАНАС 0,450мл Доставка',
	// 		position: 58,
	// 		price: 120,
	// 		slug: 'dobryj-palpi-mango-ananas-0450ml-dostavka',
	// 	},
	// ];
	return (
		<div className={styles.container}>
			{orderData?.products?.map((product) => (
				<OrderListItem key={product.id} product={product} />
			))}
		</div>
	);
};

export default OrderList;
