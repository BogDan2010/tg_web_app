import React from 'react';

import styles from './SubCategoryItem.module.scss';

const SubCategoryItem = ({ name }) => {
	return (
		<div className={styles.container}>
			<span className={styles.text}>{name}</span>
		</div>
	);
};

export default SubCategoryItem;
