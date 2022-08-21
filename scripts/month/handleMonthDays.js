// Groups days that share the same times, without taking those in other month ranges into account
function handleMonthDays(input) {
	const dayMonthSeparation = /([0-1][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9]),(([0-1][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9])\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))/g;
	input = input.replace(dayMonthSeparation, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	input = input.replace(/off;/g, "off");
	if (input.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)\s/g)) {
		input = input + " ";
		input = input.toString().replace(/(Mo|Tu|We|Th|Fr|Sa|Su|PH).+?([0-9]|f)\s/g, (_1) => {
			return combineDaysWithSameTimes(_1) + " ";
		});
		input = input.replace(/\s;/g, "; ");
	} else {
		input = combineDaysWithSameTimes(input);
	}
	input = input.replace(/off\s/g, "off;");
	input = input.replace(/;([^\s])/g, (_1, _2) => {
		return "; " + _2;
	});
	return input;
}
