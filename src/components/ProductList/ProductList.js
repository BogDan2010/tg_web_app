import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../api/categories';
import { useTelegram } from '../../hooks/useTelegram';
import { setAddedItems } from '../../store/slices/basketSlice';
import ProductItem from '../ProductItem/ProductItem';
import SubCategoryList from '../SubCategoryList/SubCategoryList';
import styles from './ProductList.module.scss';

// const products = [
// 	{
// 		id: '1',
// 		title: 'Джинсы',
// 		price: 5000,
// 		description: 'Синего цвета, прямые',
// 		count: 0,
// 	},
// 	{
// 		id: '2',
// 		title: 'Куртка',
// 		price: 12000,
// 		description: 'Зеленого цвета, теплая',
// 		count: 0,
// 	},
// 	{
// 		id: '3',
// 		title: 'Джинсы 2',
// 		price: 5000,
// 		description: 'Синего цвета, прямые',
// 		count: 0,
// 	},
// 	{
// 		id: '4',
// 		title: 'Куртка 8',
// 		price: 122,
// 		description: 'Зеленого цвета, теплая',
// 		count: 0,
// 	},
// 	{
// 		id: '5',
// 		title: 'Джинсы 3',
// 		price: 5000,
// 		description: 'Синего цвета, прямые',
// 		count: 0,
// 	},
// 	{
// 		id: '6',
// 		title: 'Куртка 7',
// 		price: 600,
// 		description: 'Зеленого цвета, теплая',
// 		count: 0,
// 	},
// 	{
// 		id: '7',
// 		title: 'Джинсы 4',
// 		price: 5500,
// 		description: 'Синего цвета, прямые',
// 		count: 0,
// 	},
// 	{
// 		id: '8',
// 		title: 'Куртка 5',
// 		price: 12000,
// 		description: 'Зеленого цвета, теплая',
// 		count: 0,
// 	},
// ];

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return (acc += item.price * item.count);
	}, 0);
};

const ProductList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const subCategory = location?.state?.subCategory;
	const products = useSelector((state) => state.categories.dataProducts);
	const addedItems = useSelector((state) => state.basket.data);

	console.log('subCategory', subCategory);

	const { tg, queryId } = useTelegram();

	useEffect(() => {
		const handleBack = () => {
			navigate('/'); // Навигация назад
		};

		// Показываем кнопку при монтировании
		tg.BackButton.show();

		// Добавляем обработчик
		tg.BackButton.onClick(handleBack);

		// Убираем кнопку и обработчик при демонтировании
		return () => {
			tg.BackButton.offClick(handleBack);
			tg.BackButton.hide();
		};
	}, [navigate]);

	// console.log('ProductList products', addedItems);

	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
			initDataUnsafe: tg.initDataUnsafe,
		};
		// fetch('https://81eb-68-183-154-121.ngrok-free.app/web-data', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// });
		navigate('/basket', { state: { data: data } });
	}, [addedItems, queryId]);

	// const onSendData = useCallback(() => {
	// 	const data = {
	// 		products: addedItems,
	// 		totalPrice: getTotalPrice(addedItems),
	// 		queryId,
	// 	};
	// 	tg.sendData(JSON.stringify(data));
	// }, [addedItems, queryId]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);

	useEffect(() => {
		dispatch(getAllCategories());
	}, []);

	const onChangeAdded = (product, flag) => {
		const alreadyAdded = addedItems?.find((item) => item.id === product.id);
		let newItems = [];

		if (alreadyAdded) {
			newItems = addedItems
				.map((item) => {
					if (item.id !== product.id) return item;

					const newCount =
						flag === 'add'
							? item.count + 1
							: flag === 'remove'
							? item.count - 1
							: item.count;

					return { ...item, count: newCount };
				})
				.filter((item) => item.count > 0);
		} else {
			newItems = [...addedItems, { ...product, count: 1 }];
		}
		dispatch(setAddedItems(newItems));

		if (newItems.length === 0) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}`,
			});
		}
	};

	const getCurrentCount = (id) =>
		addedItems?.find((item) => item.id === id)?.count || 0;

	return (
		<div>
			{subCategory?.items?.length > 0 && (
				<SubCategoryList items={subCategory?.items} />
			)}
			<div className={styles.list}>
				{products?.map((item) => (
					<ProductItem
						key={item.id}
						count={getCurrentCount(item.id)}
						product={item}
						onChangeAdded={onChangeAdded}
						className={styles.item}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductList;
