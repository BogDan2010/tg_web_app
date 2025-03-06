// phoneUtils.js

export const formatPhoneNumber = (input) => {
	const cleanedInput = input.replace(/\D/g, ''); // Удаляем все нецифровые символы
	let formattedPhone = '+7';

	if (cleanedInput.length > 1) {
		formattedPhone += `(${cleanedInput.slice(1, 4)}`;
	}
	if (cleanedInput.length >= 4) {
		formattedPhone += `) ${cleanedInput.slice(4, 7)}`;
	}
	if (cleanedInput.length >= 7) {
		formattedPhone += `-${cleanedInput.slice(7, 9)}`;
	}
	if (cleanedInput.length >= 9) {
		formattedPhone += `-${cleanedInput.slice(9, 11)}`;
	}

	return formattedPhone;
};

export const getCursorPosition = (length) => {
	if (length >= 11) return 15; // После последнего символа
	if (length >= 9) return 14; // После первого '-'
	if (length >= 7) return 13; // После второго '-'
	if (length >= 4) return 12; // После пробела
	if (length > 1) return 9; // После первой скобки
	return 2; // После +7
};
