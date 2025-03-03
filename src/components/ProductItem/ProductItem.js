import React from 'react';

import { GARRYS_API_URL } from '../../core/http';
import Button from '../Button/Button';
import styles from './ProductItem.module.scss';

const ProductItem = ({ product, onChangeAdded, className, count }) => {
	const onChangeAddedHandler = (flag) => {
		onChangeAdded(product, flag);
	};

	return (
		<div className={`${styles.product} ${className}`}>
			<div className={styles.count}>{`${count}`}</div>
			<div className={styles.imgContainer}>
				<img className={styles.img} src={`${GARRYS_API_URL}${product.image}`} />
			</div>
			<div className={styles.name}>{product.name}</div>
			<div className={styles.price}>
				<span>
					Стоимость: <b>{product.price}</b>
				</span>
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
