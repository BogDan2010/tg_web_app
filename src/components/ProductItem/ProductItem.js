import React from 'react';

import Button from '../Button/Button';
import styles from './ProductItem.module.scss';

const ProductItem = ({ product, onAdd, className, count }) => {
	const onAddHandler = () => {
		onAdd(product);
	};

	console.log('count', count);

	return (
		<div className={`${styles.product} ${className}`}>
			<div className={styles.img}></div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.price}>
				<span>
					Стоимость: <b>{product.price}</b>
				</span>
				<div className={styles.description}>{`${count}`}</div>
			</div>
			<Button className={styles.addBtn} onClick={onAddHandler}>
				Добавить в корзину
			</Button>
		</div>
	);
};

export default ProductItem;
