import React, { useCallback, useEffect, useState } from 'react';

import { useTelegram } from '../../hooks/useTelegram';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.scss';

const products = [
	{
		id: '1',
		title: 'Джинсы',
		price: 5000,
		description: 'Синего цвета, прямые',
		count: 0,
	},
	{
		id: '2',
		title: 'Куртка',
		price: 12000,
		description: 'Зеленого цвета, теплая',
		count: 0,
	},
	{
		id: '3',
		title: 'Джинсы 2',
		price: 5000,
		description: 'Синего цвета, прямые',
		count: 0,
	},
	{
		id: '4',
		title: 'Куртка 8',
		price: 122,
		description: 'Зеленого цвета, теплая',
		count: 0,
	},
	{
		id: '5',
		title: 'Джинсы 3',
		price: 5000,
		description: 'Синего цвета, прямые',
		count: 0,
	},
	{
		id: '6',
		title: 'Куртка 7',
		price: 600,
		description: 'Зеленого цвета, теплая',
		count: 0,
	},
	{
		id: '7',
		title: 'Джинсы 4',
		price: 5500,
		description: 'Синего цвета, прямые',
		count: 0,
	},
	{
		id: '8',
		title: 'Куртка 5',
		price: 12000,
		description: 'Зеленого цвета, теплая',
		count: 0,
	},
];

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => {
		return (acc += item.price * item.count);
	}, 0);
};

const ProductList = () => {
	const [addedItems, setAddedItems] = useState([]);
	const { tg, queryId } = useTelegram();

	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		};
		fetch('https://2ed2-68-183-154-121.ngrok-free.app/web-data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}, [addedItems]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => {
			tg.offEvent('mainButtonClicked', onSendData);
		};
	}, [onSendData]);
	console.log('addedItems', addedItems);
	const onAdd = (product) => {
		const alreadyAdded = addedItems.find((item) => item.id === product.id);
		let newItems = [];

		if (alreadyAdded) {
			newItems = addedItems.map((item) =>
				item.id === product.id ? { ...item, count: item.count + 1 } : item
			);
		} else {
			newItems = [...addedItems, { ...product, count: 1 }];
		}
		setAddedItems(newItems);

		if (newItems.length === 0) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
			tg.MainButton.setParams({
				text: `Купить ${getTotalPrice(newItems)}`,
			});
		}
	};

	return (
		<div className={styles.list}>
			{products.map((item) => (
				<ProductItem product={item} onAdd={onAdd} className={styles.item} />
			))}
		</div>
	);
};

export default ProductList;
