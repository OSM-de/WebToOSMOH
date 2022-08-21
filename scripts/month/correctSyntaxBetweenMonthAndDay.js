function correctSyntaxBetweenMonthAndDay(input) {
	const missingDoublePoint = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-1])[,\s]([0-2][0-9]:[0-5][0-9])/g;
	return input.toString().replace(missingDoublePoint, (_1, _2, _3, _4) => {
		return _2 + ": " + _4;
	});
}
