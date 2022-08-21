function replaceSymbols(input) {
	input = input.replace(/[–]/g, "-");
	input = input.replace(/\s*?\|\s*?|&/g, ", ");
	input = input.replace(/\./g, ":");
	input = input.replace(/:\B/g, "");
	return input;
}
