function replaceEnglishMonths(input) {
	let regexArray = [/January/gi, /February/gi, /March/gi, /April/gi, /May/gi, /June/gi, /July/gi, /August/gi, /September/gi, /October/gi, /November/gi, /December/gi];
	let replacementArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
