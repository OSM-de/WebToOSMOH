function addColon(input) {
	return (input.toString().replace(/([2][0-4]|[0-1]?[0-9])([0-5][0-9])/g, (_1, _2, _3) => {
		return _2 + ":" + _3;
	}));
}