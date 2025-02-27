import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';
// import Button from '../Button/Button';
import styles from './Header.module.scss';

const Header = () => {
	const { user } = useTelegram();

	return (
		<div className={styles.container}>
			{/* <Button onClick={onClose}>Закрыть</Button> */}
			<span className={styles.username}>{user?.username}</span>
		</div>
	);
};

export default Header;
