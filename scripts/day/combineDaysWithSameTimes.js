// Formats like this Mo 12:00-17:00, Tu 12:00-17:00 turn int Mo,Tu 12:00-17:00
function combineDaysWithSameTimes(input) {
	//A regex that detects days and the corresponding times
	const daysAndTime = new RegExp("\\s\\b(Mo|T[hu]|We|Fr|S[au]|PH)\\b\\s?" +
		"((([0-1]?[0-9]|[2][0-4]):[0-5][0-9])\\s?([-]|[+])\\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])?" +
		"(,(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])-(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])|,(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])\\+)?);?", "g");
	//in the case of when the input looks like this Sa 09:00-15:00; Su 09:00-14:00; 01:00 the 01:00 is part of the date for the next month range
	const endWithMonthDate = /(;\s([0-1][0-9]:[0-5][0-9]|[2][0-4]:[0-5][0-9]))\s$/g;
	let monthDate = "";
	if (input.match(endWithMonthDate)) {
		monthDate = input.match(endWithMonthDate).toString();
		monthDate = monthDate.replace(endWithMonthDate, (_1, _2, _3) => {
			return _3;
		});
		input = input.replace(endWithMonthDate, " ");
	}
	let intermediate = " " + input.toString();
	const matchingDays = intermediate.match(daysAndTime);
	let splittDaysAndTime = [];
	if (!!matchingDays) {
		for (let a = 0; a < matchingDays.length; a++) {
			splittDaysAndTime.push(daysAndTime.exec(intermediate));
		}
		let combinedTimes = [];
		let checkTime = "";
		let result = "";
		for (let a = 0; a < splittDaysAndTime.length; a++) {
			if (combinedTimes.length === 0) {
				combinedTimes.push(splittDaysAndTime[a][1]);
				checkTime = splittDaysAndTime[a][2];
			} else {
				if (checkTime === splittDaysAndTime[a][2]) {
					combinedTimes.push(splittDaysAndTime[a][1]);
				} else {
					result = result + combinedTimes + " " + checkTime + "; ";
					combinedTimes = [];
					a = a - 1;
				}
			}
		}
		result = result + combinedTimes + " " + checkTime + "; ";
		input = intermediate.toString().replace(daysAndTime, "");
		input = result + input;
		input = detectNewDay(input);
	} else {
		input = input + ";"
	}
	input = input.trim() + " " + monthDate;
	input = input.replace(/\s?,\s?/g, ",");
	return input.trim();
}
