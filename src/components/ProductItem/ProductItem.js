import React from 'react';

import Button from '../../ui/Button/Button';
import styles from './ProductItem.module.scss';

const ProductItem = ({ product, onAdd, className }) => {
	const onAddHandler = () => {
		onAdd(product);
	};

	return (
		<div className={`${styles.product} ${className}`}>
			<div className={styles.img}></div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.description}>{product.description}</div>
			<div className={styles.price}>
				<span>
					Стоимость: <b>{product.price}</b>
				</span>
			</div>
			<Button className={styles.addBtn} onClick={onAddHandler}>
				Добавить в корзину
			</Button>
		</div>
	);
};

export default ProductItem;
