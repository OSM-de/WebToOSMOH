function cleanUpMonthRange(input) {
	const monthRange = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec):\s([1-3][0-9].|[0]?[1-9].)/g;
	input = input.toString().replace(monthRange, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	return input;
}
