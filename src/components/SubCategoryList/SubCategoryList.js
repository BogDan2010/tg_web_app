import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getCategoryProductItems } from '../../api/categories';
import { setDataProducts } from '../../store/slices/categoriesSlice';
import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import styles from './SubCategoryList.module.scss';

const SubCategoryList = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const subCategory = location.state.subCategory;
	const dataProducts = useSelector((state) => state.categories.dataProducts);

	useEffect(() => {
		if (subCategory.items.length === 0) {
			dispatch(getCategoryProductItems(subCategory.id));
			navigate('/products');
		}
		return () => {
			dispatch(setDataProducts(null));
		};
	}, [subCategory]);

	// useEffect(() => {
	// 	if (dataProducts) {
	// 		navigate('/products');
	// 	}
	// 	return () => {
	// 		dispatch(setDataProducts(null));
	// 	};
	// }, [dataProducts]);

	// console.log('SubCategoryList location', location);

	// const getProductsList = () => {};

	return (
		<div className={styles.list}>
			{subCategory.items &&
				subCategory.items.length > 0 &&
				subCategory.items.map((item) => <SubCategoryItem name={item.name} />)}
		</div>
	);
};

export default SubCategoryList;
