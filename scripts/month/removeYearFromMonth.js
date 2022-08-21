function removeYearFromMonth(input) {
	return input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\s[2-9][0-9][0-9][0-9])/g, (_1) => {
		let temp = moment(_1,"MMM YYYY");
		return temp.format("MMM");
	});
}
