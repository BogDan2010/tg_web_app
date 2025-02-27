import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import CategoryList from './components/CategoryList/CategoryList';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import SubCategoryList from './components/SubCategoryList/SubCategoryList';
import { useTelegram } from './hooks/useTelegram';

function App() {
	const { tg } = useTelegram();
	useEffect(() => {
		tg.ready();
	}, []);

	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route index path={'/'} element={<CategoryList />} />
					<Route path={'/subcategory'} element={<SubCategoryList />} />
					<Route path={'/products'} element={<ProductList />} />
					<Route path={'form'} element={<Form />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
