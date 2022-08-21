// sorts days by order of Mo to Su with PH coming at the end
function sortDays(input) {
	//This regex detects day and Opening hours bsp: Mo 12:00-14:00, 18:0-20:30; or Mo-Sa 12:00-20:00; or  Mo,Tu,We off;
	const stringForm = new RegExp("\\b(Mo|T[hu]|We|Fr|S[au]|PH)\\b\\s?" +
		"([-,])?\\s?\\b(Mo|T[hu]|We|Fr|S[au])?\\b\\s?([-,])?\\s?\\b(Mo|T[hu]|We|Fr|S[au]|PH)?" +
		"\\b\\s?(off;)?((([0-1]?[0-9]|[2][0-4]):[0-5][0-9])\\s?([-+])\\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])?;?" +
		"(\\s?,\\s*(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])(\\+|\\s?-\\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])))*;?)?(off)?", "gm");
	let openingHoursSeperatedByDays = input.toString().match(stringForm);
	let weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "PH"];
	let days = [false, false, false, false, false, false, false, false];
	let orderedByWeekdays = [];
	if (!!openingHoursSeperatedByDays) {
		for (let a = 0; a < openingHoursSeperatedByDays.length; a++) {
			for (let b = 0; b < weekDays.length; b++) {
				if (openingHoursSeperatedByDays[a].toString().startsWith(weekDays[b])) {
					if (days[b] === false) {
						orderedByWeekdays[b] = openingHoursSeperatedByDays[a];
						days[b] = true;
					} else {
						orderedByWeekdays[b] = orderedByWeekdays[b] + "," + openingHoursSeperatedByDays[a].replace(stringForm, (_1, _2, _3, _4, _5, _6, _7, _8) => {
							return _8;
						});
						orderedByWeekdays[b] = orderedByWeekdays[b].replace(/;/g, "");
					}
				}
			}
		}
		orderedByWeekdays = orderedByWeekdays.filter(function (el) {
			return el != null;
		});
		input = orderedByWeekdays.join(" ");
	}
	return input;
}
