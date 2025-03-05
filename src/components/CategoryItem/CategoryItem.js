import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategoryProductItems } from '../../api/categories';
import { menuGrid } from '../../common/menuGrid';
import styles from './CategoryItem.module.scss';

const CategoryItem = ({ subCategory }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const getImagecategory = (id) =>
		menuGrid.find((item) => item.id === subCategory.id)?.src;

	const handleGoProducts = () => {
		dispatch(getCategoryProductItems(subCategory.id));
		navigate('/products', { state: { subCategory: subCategory } });
	};

	// useEffect(() => {
	// 		if (subCategory.items.length >= 0) {
	// 			dispatch(getCategoryProductItems(subCategory.id));
	// 			navigate('/products');
	// 		}
	// 		return () => {
	// 			dispatch(setDataProducts(null));
	// 		};
	// 	}, [subCategory]);

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer} onClick={handleGoProducts}>
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
