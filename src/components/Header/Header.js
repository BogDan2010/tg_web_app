import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../Button/Button';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const { user, onClose } = useTelegram();

	return (
		<div className={styles.container}>
			<Button onClick={() => navigate('/')}>Закрыть</Button>
			<span className={styles.username}>{user?.username}</span>
		</div>
	);
};

export default Header;
