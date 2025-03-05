import React from 'react';

import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import styles from './SubCategoryList.module.scss';

const SubCategoryList = ({ items }) => {
	return (
		<div className={styles.list}>
			{items.map((item) => (
				<SubCategoryItem name={item.name} key={item.id} />
			))}
		</div>
	);
};

export default SubCategoryList;
