import React from 'react';
import Button from '../../ui/Button/Button';
import styles from './Header.module.scss';

const Header = () => {
	const tg = window.Telegram.WebApp;

	const onClose = () => {
		console.log('click');

		tg.close();
	};
	return (
		<div className={styles.container}>
			<Button onClick={onClose}>Закрыть</Button>
			<span className={styles.username}>
				{tg.initDataUnsafe?.user?.username}
			</span>
		</div>
	);
};

export default Header;
