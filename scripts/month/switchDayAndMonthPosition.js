function switchDayAndMonthPosition(input) {
	const dayMonthPositionWrong = /([1-2][0-9]|[3][0-1]|[0]?[1-9])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	return input.replace(dayMonthPositionWrong, (_1, _2, _3) => {
		return _3 + " " + _2;
	});
}
