// This is the main conversion function for non-URL value inputs
function convert(output) {
	// First call batch
	for (
		var functionsToCall = [
			"removeUnNeededSpace", "handlePM", "shortenDaysEng", "englishWords", "replaceEnglishMonths", "shortenDaysGer", 
			"germanWords", "replaceGermanMonths", "removeYearFromMonth", "addDoublePoint", "removeUnwantedText", 
			"handleNumeralDates", "replaceSymbols", "addMissingZeros", "detectNextTime", "detectNewDay", 
			"handleUnspecificClosingTime", "removeUnNeededSpace", "addComma", "orderDaysAndTime", "handleSorting", 
			"pullDaysTogether", "handleMonthDays", "bindDaysTogether", "removeUnNeededSpace", "detectNewDay", 
			"handleSecondSorting", "cleanUp", "removeAdditionalZeroesFromMonths"
		], index = 0; index < functionsToCall.length; ++index
	) {
		output = window[functionsToCall[index]](output);
	}
	// Second batch only when month names exist
	if (output.toString().match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g)) {
		output = output.replace(/([0-9]{2}:[0-9]{2}\+)(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g,(_1,_2,_3)=>{
			return _2 + "; " + _3;
		});
		for (
			var functionsToCall = [
				"sortMonths", "correctMonthDays", "switchDayAndMonthPosition", "removeWrongDoublepoints", "addMissingZeroesDays",
				"monthRagneEndCorrection", "monthsAddSpace", "combineSameMonths", "replaceEmptyRule", "multipleSpecificDates",
				"separateMonthsAndDays", "detectNewDay", "pullMonthsTogether", "correctSyntaxBetweenMonthAndDay"
			], index = 0; index < functionsToCall.length; ++index
		) {
			output = window[functionsToCall[index]](output);
		}
	}
	output = output + ";";
	output = output.replace(/[0-2][0-9]:[0-5].+?[0-9+];/g, (_1) => {
		return cutOverlappingTime(_1);
	});
	// Last batch
	for (
		var functionsToCall = [
			"handleAdditiveTime", "cleanUp", "addMonthsToEveryDays", "replaceComma", "checkResult", "oneDaySpanCorrection"
		], index = 0; index < functionsToCall.length; ++index
	) {
		output = window[functionsToCall[index]](output);
	}
	return output;
}
function replaceEmptyRule(input) { return input.replace(/:;/g,":"); }
function multipleSpecificDates(input) {
	const multipleSpecificDatesRgx = /(Jan:|Feb:|Mar:|Apr:|May:|Jun:|Jul:|Aug:|Sep:|Oct:|Nov:|Dec:)(\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-2][0-9]):)+\s([0-2][0-9])/g;
	return input.replace(multipleSpecificDatesRgx, (_1) => {
		return multipleSpecificDatesFunction(_1);
	});
}
function combineSameMonths(input) {
	const multipleMonths = /(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2})\s([0-9]{2}:[0-9]{2}|off)[:,;]\s)(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2})\s([0-9]{2}:[0-9]{2}|off))/g;
	input = input.replace(multipleMonths,(_1,_2,_3,_4,_5,_6,_7,_8,_9)=>{
		if(_4 === _8 && _5 === _9){
			return _3 + ": " + _7 + ": " + _9;
		}
	});
	input = input.replace(/((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2}),([0-9]{2}:[0-9]{2})/g,(_1,_2,_3,_4)=>{
		return _2 + ": " + _4;
	});
	input = input.replace(/((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2}),?\s/g,(_1)=>{
		return _1 + ": ";
	});
	input = input.replace(/\s:\s/g,": ");
	input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-9]{2}):\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-9]{2})/g,(_1,_2,_3,_4,_5)=>{
		if(_2 === _4){
			return _2 + " " + _3 + "," + _5;
		} else {
			return _2 + " " + _3 + "," + _4 +" " + _5;
		}
	});
	return input;
}
function removeAdditionalZeroesFromMonths(input) {
	const detectDayBeforeMonth = /;\s([0-9]{2}):[0-9]{2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	if(input.match(detectDayBeforeMonth)){
		input = input.replace(detectDayBeforeMonth,(_1,_2,_3)=>{
			return "; " + _2 + " " + _3;
		});
	} else {
		input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-2][0-9]:00/g, (_1) => {
			let temp = moment(_1, "MMM DD:00");
			if (temp.isValid()) {
				return temp.format("MMM DD");
			} else {
				return _1;
			}
		});
	}
	return input;
}
function correctSyntaxBetweenMonthAndDay(input) {
	const missingDoublePoint = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-1])[,\s]([0-2][0-9]:[0-5][0-9])/g;
	return input.toString().replace(missingDoublePoint, (_1, _2, _3, _4) => {
		return _2 + ": " + _4;
	});
}
function removeYearFromMonth(input) {
	return input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(\s[2-9][0-9][0-9][0-9])/g, (_1) => {
		let temp = moment(_1,"MMM YYYY");
		return temp.format("MMM");
	});
}
function oneDaySpanCorrection(input) {
	return input.replace(/(Mo|Tu|We|Th|Fr|Sa|Su|PH)?\s?((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-9]):\s([0-2][0-9]:[0-5][0-9])-(Mo|Tu|We|Th|Fr|Sa|PH)?\s?((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-9]):\s([0-2][0-9]:[0-5][0-9])/g, (_1, _2, _3, _4, _5, _6, _7, _8, _9) => {
		let mFromDate = moment(_3, "MMM DD");
		let mToDate = moment(_7, "MMM DD");
		var cFromTime = _5;
		var cToTime = _9;
		if (mToDate < mFromDate) {
			let mTempDate = mToDate;
			mToDate = mFromDate;
			mFromDate = mTempDate;
			let cTempTime = cToTime;
			cToTime = cFromTime;
			cFromTime = cTempTime;
		}
		let iDiff = mToDate - mFromDate; 
		if (iDiff > 22*3600000) {
			var output = mFromDate.format("MMM DD") + ": " + cFromTime + "-24:00; ";
			var daysDiff = Math.ceil(iDiff / 86400000);
			for (var iDay = 1; iDay <= daysDiff; iDay++) {
				output = output + moment(mFromDate + iDay*86400000).format("MMM DD") + ": ";
				if (iDay == daysDiff) {
					output = output + "00:00-" + cToTime;
				} else {
					output = output + "00:00-24:00";
				}
				output = output + "; ";
			}
			return output;
		} else {
			return _1;
		}
	});
}
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
function replaceComma(input) {
	let regexArray = [/Mo,Tu/g, /Tu,We/g, /We,Th/g, /Th,Fr/g, /Fr,Sa/g, /Sa,Su/g];
	let replacementArray = ["Mo-Tu", "Tu-We", "We-Th", "Th-Fr", "Fr-Sa", "Sa-Su"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
// Transforms Jan-Feb: Mo 10:00-18:00; Tu 09:00-17:00; into Jan-Feb: Mo 10:00-18:00; Jan-Feb: Tu 09:00-17:00;
function addMonthsToEveryDays(input) {
	if (input.toString().match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g)) {
		const separateMonths = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).*?)(\s\s|$)/g;
		const detectsDays = /;\s(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g;
		const detectsMonths = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).*?:/g;
		input = input.replace(/;\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (_1, _2) => {
			return ";  " + _2;
		}).trim();
		input = input.replace(separateMonths, (_1) => {
			let months = _1.match(detectsMonths);
			_1 = _1.replace(detectsDays, (_1, _2) => {
				return "; " + months + " " + _2;
			});
			return _1;
		});
		input = input.replace(/\s+/g, " ");
		input = input.replace(/:\sPH/g, " PH");
	}
	return input;
}
function handleNumeralDates(input) {
	//only catches months like this 31.12 if dd > 24 catches all dates like this 24.12.
	const datesWithoutYear = /([0-3][0-9]\.[0-3][0-9]\.)(-|\s|,|:)/g;
	const datesWithoutSecondDot = /([2][5-9]\.[01][0-9]|[3][01]\.[01][0-9])(-|\s|,|:)/g;
	input = input.replace(datesWithoutYear, (_1, _2, _3) => {
		let temp = moment(_2,["D.M.","DD.M.","D.MM.","DD.MM."]);
		return temp.format("DD.MM.") + "20:19" + _3;
	});
	input = input.replace(datesWithoutSecondDot, (_1,_2)=>{
		return _2 + ".";
	});
	input = input.replace(/([0-2]?[0-9]\.|3[01]\.)(0?[0-9]\.|1[0-2]\.)(([0-9]{2}:)?[0-9]{2})?/g,(_1,_2,_3)=>{
		let temp = moment(_2+_3, ["D.M.","DD.M.","D.MM.","DD.MM."]);
		return temp.format("MMM DD:");
	});
	return input;
}
function replaceSymbols(input) {
	input = input.replace(/[–]/g, "-");
	input = input.replace(/\s*?\|\s*?|&/g, ", ");
	input = input.replace(/\./g, ":");
	input = input.replace(/:\B/g, "");
	return input;
}
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
				result = result + addDoublePoint(startTimes[f].toString()) + "-" + addDoublePoint(endTimes[f].toString());
			}
			if (!!timesNoEnd) {
				for (let g = 0; g < timesNoEnd.length; g++) {
					result = result + "," + addDoublePoint(timesNoEnd[g].toString() + "+");
				}
			}
			result = result + ";";
			input = result;
			input = addMissingZeros(input);
		}
	}
	return input;
}
function correctMonthDays(input) {
	const monthdayWrongSyntax = /([0-1][0-9]|[2][0-4]):00\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	return input.replace(monthdayWrongSyntax, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
}
function switchDayAndMonthPosition(input) {
	const dayMonthPositionWrong = /([1-2][0-9]|[3][0-1]|[0]?[1-9])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	return input.replace(dayMonthPositionWrong, (_1, _2, _3) => {
		return _3 + " " + _2;
	});
}
function removeWrongDoublepoints(input) {
	const doublePointsInMonths = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec):\s([0][1-9]|[1-2][0-9]|[3][0-1]|[1-9])(:00)?/g;
	return input.replace(doublePointsInMonths, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
}
function addMissingZeroesDays(input) {
	const missingZeroDays = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([1-9])([-:;])/g;
	return input.replace(missingZeroDays, (_1, _2, _3, _4) => {
		return _2 + " 0" + _3 + _4;
	});
}
function monthRagneEndCorrection(input) {
	const detectWrongEnd = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-2][0-9]|[3][0-1]);/g;
	input = input.replace(detectWrongEnd, (_1, _2, _3) => {
		return _2 + " " + _3 + ":";
	});
	input = input.replace(/:;/g, ":");
	return input;
}
function monthsAddSpace(input) {
	return input.replace(/;(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (_1, _2) => {
		return "; " + _2;
	});
}
function multipleSpecificDatesFunction(input) {
	const months = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	const days = /([0][1-9]|[1-2][0-9]|[3][01])/g;
	let listMonths = input.match(months);
	let listDays = input.match(days);
	input = "";
	input = input + listMonths[0].toString() + " " + listDays[0].toString();
	for (let a = 1; a < listMonths.length; a++) {
		if (listMonths[a - 1].toString() === listMonths[a].toString()) {
			input = input + "," + listDays[a].toString();
		} else {
			input = input + "," + listMonths[a].toString() + " " + listDays[a];
		}
	}
	input = input + ":";
	return input;
}
function separateMonthsAndDays(input) {
	const separatedByComma = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-9]),(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g;
	input = input.replace(separatedByComma, (_1, _2, _3, _4) => {
		return _2 + ": " + _4;
	});
	return input;
}
//turns May 01-May 30 into May 01-30
function pullMonthsTogether(input) {
	const monthCombination = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-3][0-9])([-,])(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-3][0-9])/g;
	input = input.replace(monthCombination, (_1, _2, _3, _4, _5, _6) => {
		if (_2 === _5) {
			return _2 + " " + _3 + _4 + _6;
		}
		return _1;
	});
	return input;
}
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
function cleanUp(input) {
	//removes ; from the end of the string
	if (input.endsWith(";")) {
		input = input.slice(0, input.length - 1);
	}
	//removes comma between Days and time like this Mo, 10:00 to Mo 10:00
	input = input.replace(/(Mo|T[hu]|We|Fr|Sa|Su|PH),(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])/g, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	//changes times like 17:00-00:00 to 17:00-24:00 as is convention
	input = input.replace(/-00:00/g, "-24:00");
	input = input.replace(/24:00-/g, "00:00-");
	input = input.replace(/Mo-Su 00:00-24:00/g, "24/7");
	input = input.replace(/\s;\s?/g, "; ");
	input = input.replace(/([0-9])(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	input = input.replace(/([0-5][0-9])\s(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	input = detectNewDay(input);
	return input;
}
//Groups days that share the same times, without taking those in other month ranges into account
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
function handleSorting(input) {
	const findDaysAndTime = /(Mo|Tu|We|Th|Fr|Sa|Su|PH).+?([0-9]|f|\+)\s/g;
	input = input + " ";
	let ifStringDoesntMatch = input.toString().match(findDaysAndTime);
	if (input.toString().match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec/g)) {
	} else if (!ifStringDoesntMatch) {
		input = sortDays(input);
	} else {
		input = input.replace(findDaysAndTime, (_1) => {
			return sortDays(_1);
		})
	}
	input = input.replace(/([0-9]);?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	input = removeUnNeededSpace(input);
	return input;
}
function handleSecondSorting(input) {
	const secondFindDaysAndTime = /(Mo|Tu|We|Th|Fr|Sa|Su|PH).+[0-9+];/g;
	const findDaysAndTime = /(Mo.+?|Tu.+?|We.+?|Th.+?|Fr.+?|Sa.+?|Su.+?|PH.+?)(([0-2][0-9]:[0-5][0-9]\s)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec|\$))/g;
	input = input.replace(/\(/gi, " (");
	input = input.replace(/([0-9]);?,?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	input = input + "$";
	input = input.replace(/([0-2][0-9]:[0-5][0-9]-[0-2][0-9]:[0-5][0-9])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	if (input.toString().match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g)) {
		input = input.replace(findDaysAndTime, (_1, _2, _3) => {
			return sortDays(_2) + _3;
		})
	} else if (input.toString().match(secondFindDaysAndTime)) {
		input = sortDays(input);
	}
	input = input.replace(/\$/g, "");
	return input;
}
function addDoublePointOnMonths(input) {
	input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)\s/g, (_1, _2) => {
		return _2 + ": ";
	});
	return input;
}
function cleanUpMonthRange(input) {
	const monthRange = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec):\s([1-3][0-9].|[0]?[1-9].)/g;
	input = input.toString().replace(monthRange, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	return input;
}
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
		input = addDoublePointOnMonths(input);
		input = cleanUpMonthRange(input);
	}
	input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)\s/g, (_1, _2) => {
		return _2 + ": ";
	});
	return input;
}
function checkResult(input) {
	input = input.replace(/off/g, "#");
	input = input.replace(/([^JFMASONDo])[a-z][A-Za-z]+/g, "");
	input = input.replace(/#/g, "off");
	if (!input.toString().match(/[0-1][0-9]:[0-5][0-9][-+]|[2][0-4]:[0-5][0-9][-+]|off|24\/7/g)) {
		input = "No valid input";
	}
	input = input.replace(/,{2,}|-{2,}|;{2,}|:{2,}|\.{2,}|\+{2,}/g, "").trim();
	return input;
}
function replaceEnglishMonths(input) {
	let regexArray = [/January/gi, /February/gi, /March/gi, /April/gi, /May/gi, /June/gi, /July/gi, /August/gi, /September/gi, /October/gi, /November/gi, /December/gi];
	let replacementArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
function replaceGermanMonths(input) {
	let regexArray = [/Januar/gi, /Februar/gi, /März/gi, /April/gi, /Mai/gi, /Juni/gi, /Juli/gi, /August/gi, /September/gi, /Oktober/gi, /November/gi, /Dezember/gi];
	let replacementArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
//replaces words with their correct symbols, geschlossen gets turned int # to make it easier to handle surplus words later
function germanWords(input) {
	input = input.replace(/\bbis\b/gi, "-");
	input = input.replace(/(\bund\b|\b\&\b|\s?\/)/gi, ",");
	input = input.replace(/\bgeschlossen\b|ruhetag/gi, "#;");
	return input.replace(/\btäglich\b/gi, "Mo-Su");
}
//replaces words with their correct symbols, from and closed get turned into ab and # to make them easier to handle later
function englishWords(input) {
	input = input.replace(/\bfrom\b/gi, "ab");
	input = input.replace(/\bto\b|\btill\b/gi, "-");
	input = input.replace(/closed\snow|\band\b/gi, "");
	input = input.replace(/\bclosed\b/gi, "#");
	input = input.replace(/Open\s24\shours/gi, "00:00-24:00");
	input = input.replace(/Bank\sHolidays/gi, "PH");
	input = input.replace(/Midnight/gi, "00:00");
	input = input.replace(/Open\send/gi, "##:##");
	input = input.replace(/(12\s)?noon/gi, "12:00");
	return input;
}
//removes any word or number longer then 4 digits and two/three letter words that were specified also turns # into the correct syntax
function removeUnwantedText(input) {
	input = input.replace(/['!©«»&@]/g,"");
	input = input.replace(/&nbsp;/g," ");
	input = input.replace(/&ndash;/g,"-");
	input = input.replace(/<(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>|{.+?}/g,"").trim();
	input = input.replace(/".+?"|[a-z]+@[a-z]+.[a-z]+/g,"");
	input = input.replace(/[äüöéèàáßçâ=<>"{}$£@¦°§¬¢[\]'_?()!\\]/gi, "");
	input = input.replace(/([a-z]{4,}|[0-9]{3,})/gi, "");
	input = input.replace(/in|\ban|am|pm|on/gi, "");
	input = input.replace(/Uhr|von|now|===|vom|der|die|das|new|img|row|add|sie|uns|\b[A-Z]\b|[()]/gi, "");
	input = input.replace(/\-##\:##/g, "+");
	input = input.replace(/#/g, "off");
	input = input.replace(/\s+/g, " ");
	return input;
}
//sorts days by order of Mo to Su with PH coming at the end
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
function bindDaysTogether(input) {
	const rowOfDays = new RegExp("(Mo|Tu|We|Th|Fr),(Tu|We|Th|Fr|Sa)," +
		"(We|Th|Fr|Sa|Su),?(Th|Fr|Sa|Su)?,?(Fr|Sa|Su)?,?(Sa|Su)?,?(Su)?", "g");
	input = input.toString().replace(rowOfDays, (_1, _2, _3, _4, _5, _6, _7, _8) => {
		if (!!_8) {
			return _2 + "-" + _8;
		} else if (!!_7) {
			if ((_2 === "Mo" && _7 === "Sa") || (_2 === "Tu" && _7 === "Su")) {
				return _2 + "-" + _7;
			}
		} else if (!!_6) {
			if ((_2 === "Mo" && _6 === "Fr") || (_2 === "Tu" && _6 === "Sa") || (_2 === "We" && _6 === "Su")) {
				return _2 + "-" + _6;
			}
		} else if (!!_5) {
			if ((_2 === "Mo" && _5 === "Th") || (_2 === "Tu" && _5 === "Fr") || (_2 === "We" && _5 === "Sa") || (_2 === "Th" && _5 === "Su")) {
				return _2 + "-" + _5;
			}
		} else if (!!_4) {
			if ((_2 === "Mo" && _4 === "We") || (_2 === "Tu" && _4 === "Th") || (_2 === "We" && _4 === "Fr") || (_2 === "Th" && _4 === "Sa") || (_2 === "Fr" && _4 === "Su")) {
				return _2 + "-" + _4;
			} else {
				return _1
			}
		}
	});
	return input;
}
function addMissingZeros(input) {
	const noMinutes = /(\s|-)([0-1]?[0-9]|2[0-4])(\s|-|$|,|\+)/g;
	const noSecondHourSyntax = /(,|\s|-)([0-9]:)/g;
	input = " " + input;
	for (let a = 0; a < 2; a++) {
		input = input.toString().replace(noMinutes, (_1, _2, _3, _4) => {
			return _2 + _3 + ":00" + _4;
		})
	}
	input = input.toString().replace(noSecondHourSyntax, (_1, _2, _3) => {
		return _2 + "0" + _3;
	});
	return input.trim();
}
function handleUnspecificClosingTime(input) {
	const noCloseTime = /\b(Mo|T[hu]|We|Fr|S[au]|PH|)\b\s?\b(ab)\b\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])/g;
	const closeTime = /\b(Mo|T[hu]|We|Fr|S[au]|PH)\b\s?\b(ab)\b\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])\s?-\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])/g;
	if (!input.match(closeTime)) {
		input = input.toString().replace(noCloseTime, (_1, _2, _3, _4, _5) => {
			//alert("_1" + _1 + "_2" + _2 + "_3" + _3 + "_4" + _4 + "_5" + _5);
			return _2 + " " + _4 + "+";
		})
	}
	return input.toString().replace(/\bab\b/g, "");
}
function shortenDaysGer(input) {
	let regexArray = [/\b(Montage?s?|Mo\.?)\b/gi, /\b(Dienstage?s?|Di\.?)\b/gi, /\b(Mittwoche?s?|Mi\.?)\b/gi,
		/\b(Donnerstage?s?|Do\.?)\b/gi, /\b(Freitage?s?|Fr\.?)\b/gi, /\b(Samstage?s?|Sa\.?)\b/gi, /\b(Sonntage?s?|So\.?)\b/gi,
		/(Sonn\.\sund\sFeiertags|Sonn-\s?(&|und)\s?Feiertage?:?|Sonn..\sFeiertage?s?)/g, /Wochenenden?\b/gi, /\b(Feiertags|Feiertage?)\b/gi];
	let replacementArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Su,PH", "Sa-Su", "PH"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
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
function removeUnNeededSpace(input) {
	input = input.replace(/\*|\r?\n|\r|\s+/g, " ");
	input = input.replace(/;;/g, ";");
	return input.replace(/\s?-\s?/g, "-").trim();
}
function addComma(input) {
	const commaSearch = /\b(Mo|T[hu]|We|Fr|[S][au]|PH)\b\s.?\s?\b(Mo|T[hu]|We|Fr|S[au]|PH)\b/g;
	input = input.toString().replace(commaSearch, (_1, _2, _3) => {
		return _2 + "," + _3;
	});
	input = input.replace(/\s?,\s?/g, ",");
	return input;
}
function addDoublePoint(input) {
	return (input.toString().replace(/([2][0-4]|[0-1]?[0-9])([0-5][0-9])/g, (_1, _2, _3) => {
		return _2 + ":" + _3;
	}));
}
function detectNextTime(input) {
	const nextTime = /(([0-1][0-9]|[2][0-4]):[0-5][0-9])\s*(([0-1]?[0-9]|[2][0-4]):[0-5][0-9]|ab)/g;
	input = (input.toString().replace(nextTime, (_1, _2, _3, _4) => {
		return _2 + ", " + _4;
	}));
	return input.replace(/\s+/g, " ");
}
function detectNewDay(input) {
	const newDay = /(([0-1]?[0-9]|[2][0-4]):[0-5][0-9]|off)\s*(Mo|T[hu]|We|Fr|Sa|Su|PH)/g;
	input = (input.toString().replace(newDay, (_1, _2, _3, _4) => {
		return _2 + "; " + _4;
	}));
	return input.replace(/off\s/g, "off;");
}
function pullDaysTogether(input) {
	const multipleDays = /(Mo|T[hu]|We|Fr|Sa|Su|PH),\s((Mo|T[hu]|We|Fr|Sa|Su|PH),\s){2,}/g;
	input = input.toString().replace(/(Mo|T[hu]|We|Fr|Sa|Su|PH)\s+(Mo|T[hu]|We|Fr|Sa|Su|PH)/g, (_1, _2, _3) => {
		return _2 + "," + _3;
	});
	return input.toString().replace(multipleDays, (_1, _2) => {
		return _2 + "-";
	});
}
function handlePM(input) {
	const findAMPM = /\b([0-9]{2}[.:][0-9]{2}|[0-9]?[0-9]|[0-9][.:][0-9]{2}|[0-9]{2}\h[0-9]{2})\s?[ap][m]/gi;
	input = input.replace(findAMPM,(_1)=>{
		let temp = moment(_1,["hh A","hh a","h A","h a","h.mm A","h.mm a","hh.mm A","hh.mm a","hh\hmm A","hh\hmm a"]);
		return temp.format("HH:mm");
	});
	input = input.replace(/\s+/g, " ");
	return input;
}