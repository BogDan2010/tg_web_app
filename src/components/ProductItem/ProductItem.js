import React from 'react';

import Button from '../Button/Button';
import styles from './ProductItem.module.scss';

const ProductItem = ({ product, onChangeAdded, className, count }) => {
	const onChangeAddedHandler = (flag) => {
		onChangeAdded(product, flag);
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
				<div className={styles.description}>{`${count}`}</div>
			</div>
			{count === 0 ? (
				<Button
					className={styles.addBtn}
					onClick={() => onChangeAddedHandler('add')}
				>
					Добавить
				</Button>
			) : (
				<div className={styles.btnContainer}>
					<Button
						className={`${styles.circleBtn} ${styles.circleBtn_remove}`}
						onClick={() => onChangeAddedHandler('remove')}
					>
						-
					</Button>
					<Button
						className={`${styles.circleBtn} ${styles.circleBtn_add}`}
						onClick={() => onChangeAddedHandler('add')}
					>
						+
					</Button>
				</div>
			)}
		</div>
	);
};

export default ProductItem;
