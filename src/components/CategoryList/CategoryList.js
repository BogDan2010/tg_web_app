import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../api/categories';
import CategoryItem from '../CategoryItem/CategoryItem';

import styles from './CategoryList.module.scss';

const CategoryList = () => {
	const dispatch = useDispatch();

	const categories = useSelector((state) => state.categories.data);

	useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	return (
		<div className={styles.list}>
			{categories?.map((item) => (
				<CategoryItem subCategory={item} key={item.id} />
			))}
		</div>
	);
};

export default CategoryList;
