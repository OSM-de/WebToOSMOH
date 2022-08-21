// Transforms Jan-Feb: Mo 10:00-18:00; Tu 09:00-17:00; into Jan-Feb: Mo 10:00-18:00; Jan-Feb: Tu 09:00-17:00;
function addMonthsToEveryDays(input) {
	if (input.toString().match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/g)) {
		const separateMonths = /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).*?)(\s\s|$)/g;
		const detectsDays = /;\s(Mo|Tu|We|Th|Fr|Sa|Su|PH)/g;
		const detectsMonths = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec).*?:/g;
		input = input.replace(/;\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, (_1, _2) => {
			return ";  " + _2;
		}).trim();
		input = input.replace(separateMonths, (_1) => {
			let months = _1.match(detectsMonths);
			_1 = _1.replace(detectsDays, (_1, _2) => {
				return "; " + months + " " + _2;
			});
			return _1;
		});
		input = input.replace(/\s+/g, " ");
		input = input.replace(/:\sPH/g, " PH");
	}
	return input;
}
