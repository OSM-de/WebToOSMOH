function handleUnspecificClosingTime(input) {
	const noCloseTime = /\b(Mo|T[hu]|We|Fr|S[au]|PH|)\b\s?\b(ab)\b\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])/g;
	const closeTime = /\b(Mo|T[hu]|We|Fr|S[au]|PH)\b\s?\b(ab)\b\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])\s?-\s?(([0-1]?[0-9]|[2][0-4]):[0-5][0-9])/g;
	if (!input.match(closeTime)) {
		input = input.toString().replace(noCloseTime, (_1, _2, _3, _4, _5) => {
			return _2 + " " + _4 + "+";
		})
	}
	return input.toString().replace(/\bab\b/g, "");
}
