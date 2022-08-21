function handleSorting(input) {
	const findDaysAndTime = /(Mo|Tu|We|Th|Fr|Sa|Su|PH).+?([0-9]|f|\+)\s/g;
	input = input + " ";
	let ifStringDoesntMatch = input.toString().match(findDaysAndTime);
	if (input.toString().match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec/g)) {
	} else if (!ifStringDoesntMatch) {
		input = sortDays(input);
	} else {
		input = input.replace(findDaysAndTime, (_1) => {
			return sortDays(_1);
		})
	}
	input = input.replace(/([0-9]);?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	input = removeUnNeededSpace(input);
	return input;
}
function handleSecondSorting(input) {
	const secondFindDaysAndTime = /(Mo|Tu|We|Th|Fr|Sa|Su|PH).+[0-9+];/g;
	const findDaysAndTime = /(Mo.+?|Tu.+?|We.+?|Th.+?|Fr.+?|Sa.+?|Su.+?|PH.+?)(([0-2][0-9]:[0-5][0-9]\s)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec|\$))/g;
	input = input.replace(/\(/gi, " (");
	input = input.replace(/([0-9]);?,?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + " " + _3;
	});
	input = input + "$";
	input = input.replace(/([0-2][0-9]:[0-5][0-9]-[0-2][0-9]:[0-5][0-9])\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (_1, _2, _3) => {
		return _2 + "; " + _3;
	});
	if (input.toString().match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Oct|Sep|Nov|Dec)/g)) {
		input = input.replace(findDaysAndTime, (_1, _2, _3) => {
			return sortDays(_2) + _3;
		})
	} else if (input.toString().match(secondFindDaysAndTime)) {
		input = sortDays(input);
	}
	input = input.replace(/\$/g, "");
	return input;
}
