function detectNewDay(input) {
	const newDay = /(([0-1]?[0-9]|[2][0-4]):[0-5][0-9]|off)\s*(Mo|T[hu]|We|Fr|Sa|Su|PH)/g;
	input = (input.toString().replace(newDay, (_1, _2, _3, _4) => {
		return _2 + "; " + _4;
	}));
	return input.replace(/off\s/g, "off;");
}
