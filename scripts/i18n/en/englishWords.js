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
