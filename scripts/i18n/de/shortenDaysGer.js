function shortenDaysGer(input) {
	let regexArray = [/\b(Montage?s?|Mo\.?)\b/gi, /\b(Dienstage?s?|Di\.?)\b/gi, /\b(Mittwoche?s?|Mi\.?)\b/gi,
		/\b(Donnerstage?s?|Do\.?)\b/gi, /\b(Freitage?s?|Fr\.?)\b/gi, /\b(Samstage?s?|Sonnabende?s?|Sa\.?)\b/gi, /\b(Sonntage?s?|So\.?)\b/gi,
		/(Sonn\.\sund\sFeiertags|Sonn-\s?(&|und)\s?Feiertage?:?|Sonn..\sFeiertage?s?)/g, /Wochenenden?\b/gi, /\b(Feiertags|Feiertage?)\b/gi];
	let replacementArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Su,PH", "Sa-Su", "PH"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
