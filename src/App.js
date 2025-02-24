import React, { useEffect } from 'react';

import './App.css';
const tg = window.Telegram.WebApp;
function App() {
	useEffect(() => {
		tg.ready();
	}, []);

	const onClose = () => {
		tg.close();
	};

	return (
		<div className='App'>
			<div className={'action'}>
				<button onClick={onClose} className={'button'}>
					Закрыть close
				</button>
			</div>
		</div>
	);
}

export default App;
