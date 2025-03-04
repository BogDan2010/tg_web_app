import React from 'react';

import OrderListItem from '../OrderListItem/OrderListItem';
import styles from './OrderList.module.scss';

const OrderList = ({ orderData }) => {
	console.log('orderData', orderData);
	return (
		<div className={styles.container}>
			{orderData?.map((product) => (
				<OrderListItem key={product.id} product={product} />
			))}
		</div>
	);
};

export default OrderList;
