function correctMonthDays(input) {
	const monthdayWrongSyntax = /([0-1][0-9]|[2][0-4]):00\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	return input.replace(monthdayWrongSyntax, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
}
