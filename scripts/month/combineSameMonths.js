function combineSameMonths(input) {
	const multipleMonths = /(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2})\s([0-9]{2}:[0-9]{2}|off)[:,;]\s)(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2})\s([0-9]{2}:[0-9]{2}|off))/g;
	input = input.replace(multipleMonths,(_1,_2,_3,_4,_5,_6,_7,_8,_9)=>{
		if(_4 === _8 && _5 === _9){
			return _3 + ": " + _7 + ": " + _9;
		}
	});
	input = input.replace(/((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2}),([0-9]{2}:[0-9]{2})/g,(_1,_2,_3,_4)=>{
		return _2 + ": " + _4;
	});
	input = input.replace(/((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s[0-9]{2}),?\s/g,(_1)=>{
		return _1 + ": ";
	});
	input = input.replace(/\s:\s/g,": ");
	input = input.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-9]{2}):\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s([0-9]{2})/g,(_1,_2,_3,_4,_5)=>{
		if(_2 === _4){
			return _2 + " " + _3 + "," + _5;
		} else {
			return _2 + " " + _3 + "," + _4 +" " + _5;
		}
	});
	return input;
}
