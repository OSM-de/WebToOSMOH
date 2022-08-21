function removeWrongColons(input) {
	const colonsInMonths = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec):\s([0][1-9]|[1-2][0-9]|[3][0-1]|[1-9])(:00)?/g;
	return input.replace(colonsInMonths, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
}