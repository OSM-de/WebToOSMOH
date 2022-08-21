function cleanUp(input) {
	//removes ; from the end of the string
	if (input.endsWith(";")) {
		input = input.slice(0, input.length - 1);
	}
	//removes comma between Days and time like this Mo, 10:00 to Mo 10:00
	input = input.replace(/(Mo|T[hu]|We|Fr|Sa|Su|PH),(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])/g, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	//changes times like 17:00-00:00 to 17:00-24:00 as is convention
	input = input.replace(/-00:00/g, "-24:00");
	input = input.replace(/24:00-/g, "00:00-");
	input = input.replace(/Mo-Su 00:00-24:00/g, "24/7");
	input = input.replace(/\s;\s?/g, "; ");
	input = input.replace(/([0-9])(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	input = input.replace(/([0-5][0-9])\s(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	input = detectNewDay(input);
	return input;
}
