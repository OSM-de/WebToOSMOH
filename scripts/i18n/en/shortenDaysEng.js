function shortenDaysEng(input) {
	let regexArray = [/\bWeekdays/gi, /\bdaily\b/gi, /\b(Mondays?|Mon\.?)\b/gi, /\b(Tuesdays?|Tue\.?|Tues)\b/gi,
		/\b(Wednesdays?|Wed\.?)\b/gi, /\b(Thursdays?|Thu\.?|Thurs)\b/gi, /\b(Fridays?|Fri\.?)\b/gi, /\b(Saturdays?|Sat\.?)\b/gi,
		/\b(Sundays?|Sun\.?)\b/gi, /Bank Holidays?|\bPublic Holidays?\b|Public & Bank Holidays/gi];
	let replacementArray = ["Mo-Fr", "Mo-Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "PH"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
