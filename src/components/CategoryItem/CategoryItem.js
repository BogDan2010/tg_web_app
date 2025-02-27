import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuGrid } from '../../common/menuGrid';
import styles from './CategoryItem.module.scss';

const CategoryItem = ({ subCategory }) => {
	const navigate = useNavigate();
	const getImagecategory = (id) =>
		menuGrid.find((item) => item.id === subCategory.id)?.src;

	return (
		<div className={styles.container}>
			<div
				className={styles.imgContainer}
				onClick={() =>
					navigate('subcategory', { state: { items: subCategory.items } })
				}
			>
				<img
					alt=''
					src={getImagecategory(subCategory.id)}
					className={styles.img}
				/>
			</div>
			<div className={styles.title}>{subCategory.name}</div>
		</div>
	);
};

export default CategoryItem;
