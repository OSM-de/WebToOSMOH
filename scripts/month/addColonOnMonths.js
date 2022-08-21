function addColonOnMonths(input) {
	input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)\s/g, (_1, _2) => {
		return _2 + ": ";
	});
	return input;
}