function removeAdditionalZeroesFromMonths(input) {
	const detectDayBeforeMonth = /;\s([0-9]{2}):[0-9]{2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g;
	if(input.match(detectDayBeforeMonth)){
		input = input.replace(detectDayBeforeMonth,(_1,_2,_3)=>{
			return "; " + _2 + " " + _3;
		});
	} else {
		input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-2][0-9]:00/g, (_1) => {
			let temp = moment(_1, "MMM DD:00");
			if (temp.isValid()) {
				return temp.format("MMM DD");
			} else {
				return _1;
			}
		});
	}
	return input;
}
