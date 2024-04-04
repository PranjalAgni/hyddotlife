// mm-dd-yyyy format
export function getTodaysDate() {
	const date = new Date();

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${month}/${day}/${year}`;
}
