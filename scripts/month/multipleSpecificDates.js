function multipleSpecificDates(input) {
	const multipleSpecificDatesRgx = /(Jan:|Feb:|Mar:|Apr:|May:|Jun:|Jul:|Aug:|Sep:|Oct:|Nov:|Dec:)(\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-2][0-9]):)+\s([0-2][0-9])/g;
	return input.replace(multipleSpecificDatesRgx, (_1) => {
		return multipleSpecificDatesFunction(_1);
	});
}
function multipleSpecificDatesFunction(input) {
	const months = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	const days = /([0][1-9]|[1-2][0-9]|[3][01])/g;
	let listMonths = input.match(months);
	let listDays = input.match(days);
	input = "";
	input = input + listMonths[0].toString() + " " + listDays[0].toString();
	for (let a = 1; a < listMonths.length; a++) {
		if (listMonths[a - 1].toString() === listMonths[a].toString()) {
			input = input + "," + listDays[a].toString();
		} else {
			input = input + "," + listMonths[a].toString() + " " + listDays[a];
		}
	}
	input = input + ":";
	return input;
}
