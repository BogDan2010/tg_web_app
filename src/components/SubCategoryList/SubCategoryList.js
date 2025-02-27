import React from 'react';
import { useLocation } from 'react-router-dom';

import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import styles from './SubCategoryList.module.scss';

const SubCategoryList = () => {
	const location = useLocation();
	const items = location.state.items;

	console.log('SubCategoryList location', location);
	return (
		<div className={styles.list}>
			{items.map((item) => (
				<SubCategoryItem name={item.name} />
			))}
		</div>
	);
};

export default SubCategoryList;
