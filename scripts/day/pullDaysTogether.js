function pullDaysTogether(input) {
	const multipleDays = /(Mo|T[hu]|We|Fr|Sa|Su|PH),\s((Mo|T[hu]|We|Fr|Sa|Su|PH),\s){2,}/g;
	input = input.toString().replace(/(Mo|T[hu]|We|Fr|Sa|Su|PH)\s+(Mo|T[hu]|We|Fr|Sa|Su|PH)/g, (_1, _2, _3) => {
		return _2 + "," + _3;
	});
	return input.toString().replace(multipleDays, (_1, _2) => {
		return _2 + "-";
	});
}
