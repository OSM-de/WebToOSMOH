//Transforms Mo-Fr 08:0-16:00; We 18:00-22:00; into Mo-Fr 08:00-16:00, We 18:00-22:00;
function handleAdditiveTime(input) {
	const findTimeAndDays = new RegExp("(Mo|Tu|We|Th|Fr|Sa|Su)-(Mo|Tu|We|Th|Fr|Sa|Su)\\s" +
		"([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9])-([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9]);\\s" +
		"((Mo|Tu|We|Th|Fr|Sa|Su)\\s([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9])-([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9]);?\\s?)+", "g");
	input = input.toString().replace(findTimeAndDays, (_1) => {
		let timeWithDayRange = /(Mo|Tu|We|Th|Fr|Sa|Su)-(Mo|Tu|We|Th|Fr|Sa|Su)\s(([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9])-([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9]))/g;
		let timeWithSingleDay = /(Mo|Tu|We|Th|Fr|Sa|Su)\s(([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9])-([01][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9]))/g;
		let week = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
		let trial = _1;
		let dayAndTime = trial.match(timeWithSingleDay);
		let dayRangAndTime = trial.match(timeWithDayRange);
		let startDay = dayRangAndTime.toString()[0] + dayRangAndTime.toString()[1];
		let endDay = dayRangAndTime.toString()[3] + dayRangAndTime.toString()[4];
		let startDayIndex = week.indexOf(startDay);
		let endDayIndex = week.indexOf(endDay);
		let result = dayRangAndTime.toString();
		let daysAndTimeOutsideRange = [];
		for (let a = 1; a < dayAndTime.length; a++) {
			let singleDayIndex = week.indexOf(dayAndTime[a].toString()[0] + dayAndTime[a].toString()[1]);
			if (startDayIndex < singleDayIndex && endDayIndex > singleDayIndex) {
				result = result + ", " + dayAndTime[a];
			} else {
				daysAndTimeOutsideRange.push(dayAndTime[a].toString());
			}
		}
		if (!!daysAndTimeOutsideRange) {
			for (let b = 0; b < daysAndTimeOutsideRange.length; b++) {
				result = result + "; " + daysAndTimeOutsideRange[b];
			}
		}
		result = result + "; ";
		return result;
	});
	input = input.toString().replace(/;\s$/g, "");
	return input;
}
