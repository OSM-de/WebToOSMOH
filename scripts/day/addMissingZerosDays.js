function addMissingZerosDays(input) {
	const missingZeroDays = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([1-9])([-:;])/g;
	return input.replace(missingZeroDays, (_1, _2, _3, _4) => {
		return _2 + " 0" + _3 + _4;
	});
}
