function handleNumeralDates(input) {
	//only catches months like this 31.12 if dd > 24 catches all dates like this 24.12.
	const datesWithoutYear = /([0-3][0-9]\.[0-3][0-9]\.)(-|\s|,|:)/g;
	const datesWithoutSecondDot = /([2][5-9]\.[01][0-9]|[3][01]\.[01][0-9])(-|\s|,|:)/g;
	input = input.replace(datesWithoutYear, (_1, _2, _3) => {
		let temp = moment(_2,["D.M.","DD.M.","D.MM.","DD.MM."]);
		return temp.format("DD.MM.") + "20:19" + _3;
	});
	input = input.replace(datesWithoutSecondDot, (_1,_2)=>{
		return _2 + ".";
	});
	input = input.replace(/([0-2]?[0-9]\.|3[01]\.)(0?[0-9]\.|1[0-2]\.)(([0-9]{2}:)?[0-9]{2})?/g,(_1,_2,_3)=>{
		let temp = moment(_2+_3, ["D.M.","DD.M.","D.MM.","DD.MM."]);
		return temp.format("MMM DD:");
	});
	return input;
}
