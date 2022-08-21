// This is the main conversion function for non-URL value inputs
function convert(output) {
	// First call batch
	for (
		var functionsToCall = [
			"removeUnNeededSpace", "handlePM", "shortenDaysEng", "englishWords", "replaceEnglishMonths", "shortenDaysGer", 
			"germanWords", "replaceGermanMonths", "removeYearFromMonth", "addColon", "removeUnwantedText", 
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
				"sortMonths", "correctMonthDays", "switchDayAndMonthPosition", "removeWrongColons", "addMissingZerosDays",
				"monthRangeEndCorrection", "monthsAddSpace", "combineSameMonths", "replaceEmptyRule", "multipleSpecificDates",
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