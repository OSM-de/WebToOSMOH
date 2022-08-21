function addComma(input) {
	const commaSearch = /\b(Mo|T[hu]|We|Fr|[S][au]|PH)\b\s.?\s?\b(Mo|T[hu]|We|Fr|S[au]|PH)\b/g;
	input = input.toString().replace(commaSearch, (_1, _2, _3) => {
		return _2 + "," + _3;
	});
	input = input.replace(/\s?,\s?/g, ",");
	return input;
}
