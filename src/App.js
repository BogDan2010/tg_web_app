import React, { useEffect } from 'react';

import './App.css';
import Header from './components/Header/Header';

const tg = window.Telegram.WebApp;
function App() {
	useEffect(() => {
		tg.ready();
	}, []);

	return (
		<div className='App'>
			<Header />
			<div className={'action'}></div>
		</div>
	);
}

export default App;
