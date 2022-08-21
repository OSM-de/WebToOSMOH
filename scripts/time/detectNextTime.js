function detectNextTime(input) {
	const nextTime = /(([0-1][0-9]|[2][0-4]):[0-5][0-9])\s*(([0-1]?[0-9]|[2][0-4]):[0-5][0-9]|ab)/g;
	input = (input.toString().replace(nextTime, (_1, _2, _3, _4) => {
		return _2 + ", " + _4;
	}));
	return input.replace(/\s+/g, " ");
}
