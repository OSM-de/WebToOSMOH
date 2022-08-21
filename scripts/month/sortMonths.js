function sortMonths(input) {
	const months = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	const monthRangFinder = new RegExp("(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)([,\\-])?" +
		"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?(,Jan|,Feb|,Mar|,Apr|,May|,Jun|,Jul|,Aug|,Sep|,Oct|,Nov|,Dec)*", "g");
	const timeRangFinder = /((Mo|Tu|We|Th|Fr|Sa|Su|PH).*?[0-9];)(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	input = input.replace(/([0-9]-[0-5][0-9])\s?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	if (input.toString().match(months)) {
		if (input.match(/(Jan$|Feb$|Mar$|Apr$|May$|Jun$|Jul$|Aug$|Sep$|Oct$|Nov$|Dec$)/gm)) {
			const monthRanges = input.match(monthRangFinder);
			const timeRanges = input.match(timeRangFinder);
			if (monthRanges.length === timeRanges.length) {
				let newString = "";
				for (let a = 0; a < monthRanges.length; a++) {
					timeRanges[a] = timeRanges[a].replace(months, "");
					monthRanges[a] = monthRanges[a] + " ";
					newString = newString + monthRanges[a] + timeRanges[a];
				}
				input = newString.slice(0, newString.length - 1);
			}
		}
		input = addColonOnMonths(input);
		input = cleanUpMonthRange(input);
	}
	input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)\s/g, (_1, _2) => {
		return _2 + ": ";
	});
	return input;
}
