function bindDaysTogether(input) {
	const rowOfDays = new RegExp("(Mo|Tu|We|Th|Fr),(Tu|We|Th|Fr|Sa)," +
		"(We|Th|Fr|Sa|Su),?(Th|Fr|Sa|Su)?,?(Fr|Sa|Su)?,?(Sa|Su)?,?(Su)?", "g");
	input = input.toString().replace(rowOfDays, (_1, _2, _3, _4, _5, _6, _7, _8) => {
		if (!!_8) {
			return _2 + "-" + _8;
		} else if (!!_7) {
			if ((_2 === "Mo" && _7 === "Sa") || (_2 === "Tu" && _7 === "Su")) {
				return _2 + "-" + _7;
			}
		} else if (!!_6) {
			if ((_2 === "Mo" && _6 === "Fr") || (_2 === "Tu" && _6 === "Sa") || (_2 === "We" && _6 === "Su")) {
				return _2 + "-" + _6;
			}
		} else if (!!_5) {
			if ((_2 === "Mo" && _5 === "Th") || (_2 === "Tu" && _5 === "Fr") || (_2 === "We" && _5 === "Sa") || (_2 === "Th" && _5 === "Su")) {
				return _2 + "-" + _5;
			}
		} else if (!!_4) {
			if ((_2 === "Mo" && _4 === "We") || (_2 === "Tu" && _4 === "Th") || (_2 === "We" && _4 === "Fr") || (_2 === "Th" && _4 === "Sa") || (_2 === "Fr" && _4 === "Su")) {
				return _2 + "-" + _4;
			} else {
				return _1
			}
		}
	});
	return input;
}
