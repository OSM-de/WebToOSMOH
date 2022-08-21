function cutOverlappingTime(input) {
	const timesWithoutEnd = /([0-2][0-9]:[0-5][0-9]\+)/g;
	const hoursPlusMinutes = /[0-5][0-9]/g;
	const newTimesTest = /(([0-2][0-9]:[0-5][0-9])[-,;])/g;
	if (input.match(/,/g)) {
		let timesList = input.match(newTimesTest);
		let listTimesWithoutEnd = input.match(timesWithoutEnd);
		//produces an array that turns for example 18:00-23:00 into [18,00,23,00]
		let hoursAndMinutes = timesList.join(" ").match(hoursPlusMinutes);
		if (timesList.length % 2 === 0) {
			let startTimes = [];
			let endTimes = [];
			for (let a = 0; a < hoursAndMinutes.length; a++) {
				if (startTimes.length === endTimes.length) {
					startTimes.push(parseInt(hoursAndMinutes[a] + hoursAndMinutes[a + 1]));
					a = a + 1;
				} else {
					endTimes.push(parseInt(hoursAndMinutes[a] + hoursAndMinutes[a + 1]));
					a = a + 1;
				}
			}
			let timesNoEnd = [];
			if (!!listTimesWithoutEnd) {
				let noEndHoursAndMinutes = listTimesWithoutEnd.join(" ").match(hoursPlusMinutes);
				for (let b = 0; b < noEndHoursAndMinutes.length; b++) {
					timesNoEnd.push(parseInt(noEndHoursAndMinutes[b] + noEndHoursAndMinutes[b + 1]));
					b = b + 1;
				}
			}
			for (let c = 0; c < startTimes.length; c++) {
				let cNextDay = 0;
				let dNextDay = 0;
				for (let d = c + 1; d < startTimes.length; d++) {
					cNextDay = 0;
					dNextDay = 0;
					if (startTimes[d] > endTimes[d]) {
						dNextDay = 2400;
					}
					if (startTimes[c] > endTimes[c]) {
						cNextDay = 2400;
					}
					if (startTimes[c] >= startTimes[d] && endTimes[c] + cNextDay <= endTimes[d] + dNextDay) {
						delete startTimes[c];
						delete endTimes[c];
					} else if (startTimes[c] < startTimes[d] && endTimes[c] + cNextDay > endTimes[d] + dNextDay) {
						delete startTimes[d];
						delete endTimes[d];
					}
				}
				if (!!timesNoEnd) {
					for (let e = 0; e < timesNoEnd.length; e++) {
						cNextDay = 0;
						if (startTimes[c] > endTimes[c]) {
							cNextDay = 2400;
						}
						if (startTimes[c] <= timesNoEnd[e] && endTimes[c] + cNextDay > timesNoEnd[e]) {
							delete timesNoEnd[e];
						}
					}
				}
			}
			timesNoEnd = timesNoEnd.filter(function (el) {
				return el != null;
			});
			startTimes = startTimes.filter(function (el) {
				return el != null;
			});
			endTimes = endTimes.filter(function (el) {
				return el != null;
			});
			let result = "";
			for (let f = 0; f < startTimes.length; f++) {
				if (f > 0) {
					result = result + ","
				}
				result = result + addColon(startTimes[f].toString()) + "-" + addColon(endTimes[f].toString());
			}
			if (!!timesNoEnd) {
				for (let g = 0; g < timesNoEnd.length; g++) {
					result = result + "," + addColon(timesNoEnd[g].toString() + "+");
				}
			}
			result = result + ";";
			input = result;
			input = addMissingZeros(input);
		}
	}
	return input;
}
