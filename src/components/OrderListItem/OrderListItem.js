import React from 'react';

import { GARRYS_API_URL } from '../../core/http';
import styles from './OrderListItem.module.scss';

const OrderListItem = ({ product }) => {
	return (
		<div className={styles.container}>
			<div className={styles.imageContainer}>
				<img
					alt=''
					src={`${GARRYS_API_URL}${product.image}`}
					className={styles.image}
				/>
			</div>
			<div className={styles.productDataContainer}>
				<span className={styles.productName}></span>
				<span className={styles.productCount}></span>
			</div>
			<div className={styles.priceContainer}></div>
		</div>
	);
};

export default OrderListItem;
