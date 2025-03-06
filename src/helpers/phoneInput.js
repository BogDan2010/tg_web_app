export const phoneInput = (str) => {
	const input = str.replace(/\D/g, '');
	let formattedPhone = '+7';

	if (input.length > 1) {
		formattedPhone += `(${input.slice(1, 4)}`;
	}
	if (input.length >= 4) {
		formattedPhone += `) ${input.slice(4, 7)}`;
	}
	if (input.length >= 7) {
		formattedPhone += `-${input.slice(7, 9)}`;
	}
	if (input.length >= 9) {
		formattedPhone += `-${input.slice(9, 11)}`;
	}

	return formattedPhone;
};
