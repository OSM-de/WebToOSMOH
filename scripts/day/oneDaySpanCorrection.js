function oneDaySpanCorrection(input) {
	return input.replace(/(Mo|Tu|We|Th|Fr|Sa|Su|PH)?\s?((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-9]):\s([0-2][0-9]:[0-5][0-9])-(Mo|Tu|We|Th|Fr|Sa|PH)?\s?((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-3][0-9]):\s([0-2][0-9]:[0-5][0-9])/g, (_1, _2, _3, _4, _5, _6, _7, _8, _9) => {
		let mFromDate = moment(_3, "MMM DD");
		let mToDate = moment(_7, "MMM DD");
		var cFromTime = _5;
		var cToTime = _9;
		if (mToDate < mFromDate) {
			let mTempDate = mToDate;
			mToDate = mFromDate;
			mFromDate = mTempDate;
			let cTempTime = cToTime;
			cToTime = cFromTime;
			cFromTime = cTempTime;
		}
		let iDiff = mToDate - mFromDate; 
		if (iDiff > 22*3600000) {
			var output = mFromDate.format("MMM DD") + ": " + cFromTime + "-24:00; ";
			var daysDiff = Math.ceil(iDiff / 86400000);
			for (var iDay = 1; iDay <= daysDiff; iDay++) {
				output = output + moment(mFromDate + iDay*86400000).format("MMM DD") + ": ";
				if (iDay == daysDiff) {
					output = output + "00:00-" + cToTime;
				} else {
					output = output + "00:00-24:00";
				}
				output = output + "; ";
			}
			return output;
		} else {
			return _1;
		}
	});
}
