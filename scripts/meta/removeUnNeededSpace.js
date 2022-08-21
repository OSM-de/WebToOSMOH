function removeUnNeededSpace(input) {
	input = input.replace(/\*|\r?\n|\r|\s+/g, " ");
	input = input.replace(/;;/g, ";");
	return input.replace(/\s?-\s?/g, "-").trim();
}
