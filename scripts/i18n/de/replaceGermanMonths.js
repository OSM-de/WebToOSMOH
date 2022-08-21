function replaceGermanMonths(input) {
	let regexArray = [/Januar/gi, /Februar/gi, /März/gi, /April/gi, /Mai/gi, /Juni/gi, /Juli/gi, /August/gi, /September/gi, /Oktober/gi, /November/gi, /Dezember/gi];
	let replacementArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
