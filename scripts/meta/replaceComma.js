function replaceComma(input) {
	let regexArray = [/Mo,Tu/g, /Tu,We/g, /We,Th/g, /Th,Fr/g, /Fr,Sa/g, /Sa,Su/g];
	let replacementArray = ["Mo-Tu", "Tu-We", "We-Th", "Th-Fr", "Fr-Sa", "Sa-Su"];
	for (let a = 0; a < regexArray.length; a++) {
		input = input.replace(regexArray[a], replacementArray[a]);
	}
	return input;
}
