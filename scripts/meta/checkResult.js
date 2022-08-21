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
