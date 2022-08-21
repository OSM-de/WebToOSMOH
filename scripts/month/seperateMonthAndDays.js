function separateMonthsAndDays(input) {
	const separatedByComma = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-9]),(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g;
	input = input.replace(separatedByComma, (_1, _2, _3, _4) => {
		return _2 + ": " + _4;
	});
	return input;
}
