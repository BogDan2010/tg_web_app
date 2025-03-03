import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../Button/Button';
import styles from './Header.module.scss';

const Header = ({ title, titleButton }) => {
	const navigate = useNavigate();
	const { user, onClose } = useTelegram();

	return (
		<div className={styles.container}>
			<span className={styles.username}>{title}</span>
			<Button onClick={() => navigate('/')} className={styles.button}>
				{titleButton}
			</Button>
		</div>
	);
};

export default Header;
