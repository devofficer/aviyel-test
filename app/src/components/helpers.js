export function getTwoDigits(value) {
	return ("0" + value).slice(-2);
}

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTotalPrice(items) {
	return items.map((item) => item.price).reduce((a, b) => a + b, 0);
}

export function getGrantTotalPrice(items, tax, discount) {
	const subTotal = getTotalPrice(items);
	const taxTotal = getSubPrice(subTotal, tax);
	const discountTotal = getSubPrice(subTotal, discount);

	return subTotal + taxTotal - discountTotal;
}

export function getFilteredInvoices(invoices, searchValue) {
	return invoices.filter((invoice) =>
		invoice.full_name.toLowerCase().includes(searchValue.toLowerCase())
	);
}

export function toTwoDecimal(value) {
	return (Math.round(value * 100) / 100).toFixed(2);
}

export function getSubPrice(price, percent) {
	return (price * percent) / 100;
}
