//replaces words with their correct symbols, geschlossen gets turned int # to make it easier to handle surplus words later
function germanWords(input) {
	input = input.replace(/\bbis\b/gi, "-");
	input = input.replace(/(\bund\b|\b\&\b|\s?\/)/gi, ",");
	input = input.replace(/\bgeschlossen\b|ruhetag/gi, "#;");
	input = input.replace(/\btäglich\b/gi, "Mo-Su");
	return input;
}
