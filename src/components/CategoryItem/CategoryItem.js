import React from 'react';

import { menuGrid } from '../../common/menuGrid';
import styles from './CategoryItem.module.scss';

const CategoryItem = ({ subCategory }) => {
	const getImagecategory = (id) =>
		menuGrid.find((item) => item.id === subCategory.id)?.src;

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<img
					alt=''
					src={getImagecategory(subCategory.id)}
					className={styles.img}
				/>
			</div>
			{/* <div className={styles.title}>{subCategory.name}</div> */}
		</div>
	);
};

export default CategoryItem;
