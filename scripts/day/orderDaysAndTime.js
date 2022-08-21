function orderDaysAndTime(input) {
	const dayRangeFinder = /(Mo|Tu|We|Th|Fr|Sa|Su|PH)([-|,])?(Mo|Tu|We|Th|Fr|Sa|Su|PH)?(,Mo|,Tu|,We|,Th|,Fr|,Sa|,Su|,PH)*/g;
	const timeRangeFinder = /[0-2].*?;/g;
	if (input.endsWith(input.match(/(Mo$|Tu$|We$|Th$|Fr$|Sa$|Su$|PH$)/g))) {
		const dayRange = input.match(dayRangeFinder);
		const timeRange = input.match(timeRangeFinder);
		let resultString = "";
		if (dayRange.length === timeRange.length) {
			for (let a = 0; a < dayRange.length; a++) {
				resultString = resultString + dayRange[a] + " " + timeRange[a] + " "
			}
			input = resultString.slice(0, resultString.length - 2);
		}
	}
	return input;
}
