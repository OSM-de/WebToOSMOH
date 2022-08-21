function monthRangeEndCorrection(input) {
	const detectWrongEnd = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-2][0-9]|[3][0-1]);/g;
	input = input.replace(detectWrongEnd, (_1, _2, _3) => {
		return _2 + " " + _3 + ":";
	});
	input = input.replace(/:;/g, ":");
	return input;
}
