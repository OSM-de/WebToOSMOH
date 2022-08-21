//turns May 01-May 30 into May 01-30
function pullMonthsTogether(input) {
	const monthCombination = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-3][0-9])([-,])(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-3][0-9])/g;
	input = input.replace(monthCombination, (_1, _2, _3, _4, _5, _6) => {
		if (_2 === _5) {
			return _2 + " " + _3 + _4 + _6;
		}
		return _1;
	});
	return input;
}
