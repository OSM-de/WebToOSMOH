function addMissingZeros(input) {
	const noMinutes = /(\s|-)([0-1]?[0-9]|2[0-4])(\s|-|$|,|\+)/g;
	const noSecondHourSyntax = /(,|\s|-)([0-9]:)/g;
	input = " " + input;
	for (let a = 0; a < 2; a++) {
		input = input.toString().replace(noMinutes, (_1, _2, _3, _4) => {
			return _2 + _3 + ":00" + _4;
		})
	}
	input = input.toString().replace(noSecondHourSyntax, (_1, _2, _3) => {
		return _2 + "0" + _3;
	});
	return input.trim();
}
