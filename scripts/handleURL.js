// async calls if input area contains an URL
async function isURL() {
	let input = document.getElementById("inputArea").value;
	let result = "";
	if (input.match(/https?:\/\//g)) {
		let promisResult = await getSourceAsDom(input);
		result = handleShemaOrg(promisResult);
	} else {
		result = convert(input);
	}
	if (result != "No valid input") {
		var radios = document.getElementsByName('autoCopy');
		var autoCopy = "n";
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				autoCopy = radios[i].value;
				break;
			}
		}
		if (autoCopy != "n") {
			var outp = document.createElement("textarea");
			outp.value = (autoCopy == "o" ? "opening_hours=" : "") + result;
			document.body.appendChild(outp);
			outp.select();
			outp.setSelectionRange(0, 99999);
			document.execCommand("copy");
			document.body.removeChild(outp);
		}
		hitOrGetUsageCounter('hit');
	}
	return document.getElementById("outputArea").value = result;
}
async function getSourceAsDom(url) {
	let response = await fetch("https://cors-anywhere.herokuapp.com/" + url);
	return response.text();
}

function hitOrGetUsageCounter(method) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.countapi.xyz/" + method + "/osm-de-telegram/webtoosmoh-usage");
	xhr.responseType = "json";
	xhr.onload = function() {
		document.getElementById('usages').src = "https://img.shields.io/badge/dynamic/json?color=%233866af&label=no.%20of%20conversions&query=%24.value&url=https%3A%2F%2Fapi.countapi.xyz%2Fget%2Fosm-de-telegram%2Fwebtoosmoh-usage&style=for-the-badge";
	}
	xhr.send();
}

// if input was an URL, try to handle to contents accordingly
function handleShemaOrg(string) {
	// this handles opening hours when written in markdown
	let el = document.createElement("html");
	el.innerHTML = string;
	let microOH = $(el).find("[itemprop='openingHours']");
	let microOHResponse = "" + $(microOH).attr( "content");
	microOHResponse = convert(microOHResponse);
	if (microOHResponse === "No valid input"){
		microOHResponse = "";
	}
	let micro = "" + $(el).find("[itemprop='openingHoursSpecification']").text();
	let microResponse = convert(micro);
	if (microResponse === "No valid input"){
		microResponse = "";
	}
	microResponse = (microOHResponse + " " + microResponse).trim();
	//this handles opening hours noted in RDFa
	let rdfaOH = "" + $(el).find("[property='openingHours']").attr("content");
	rdfaOH = convert(rdfaOH);
	if (rdfaOH === "No valid input"){
		rdfaOH = "";
	}
	let rdfa = "" + $(el).find("[property='openingHoursSpecification']").text();
	rdfa = convert(rdfa);
	if (rdfa ==="No valid input"){
		rdfa = "";
	}
	let rdfaResponse = (rdfaOH + " " + rdfa).trim();
	// this handles opening hours specified in the script application/ld+json
	let scripts = "" + $(el).find("[type='application/ld+json']").html();
	console.log(scripts);
	let scriptResponse = scriptHandeling(scripts);

	if (scriptResponse === "No valid input"){
		scriptResponse = "";
	}
	let result = (microResponse + " " + rdfaResponse + " " + scriptResponse).trim();
	if (result === ""){
		result = "No valid input";
	}
	return result.trim();
}
// script processing for URL input
function scriptHandeling(input) {
	let result = "";
	let outputString = " ";
	outputString = outputString + input;
	const cutOutScript = /<script type="application\/ld\+json">(.|\n)+("openingHoursSpecification":.+?|"openingHours":.+?)<\/script>/g;
	outputString = outputString.replace(cutOutScript,(_1,_2,_3) => {
		return _3;
	});
	const cutGroupOpeningHours = /"openingHours":\[(.*)\]/g;
	outputString = outputString.replace(cutGroupOpeningHours,(_1,_2)=>{
		return _2.replace(/\"/g,'');
	});
	const cutNotGroupedOpeningHours = /"openingHours":\s"(.+?)",/g;
	outputString = outputString.replace(cutNotGroupedOpeningHours, (_1,_2)=>{
		return _2;
	});
	const cutRemainingNotRelevantPart = /("openingHoursSpecification":\[.+?]).+/g;
	outputString = outputString.replace(cutRemainingNotRelevantPart,(_1,_2) => {
		return _2;
	});
	const cutJSONParts = /(http:\/\/schema.org\/|{"@type":"OpeningHoursSpecification",|},|"dayOfWeek":|"openingHoursSpecification":\[|\]|})/g;
	outputString = outputString.replace(cutJSONParts,"");
	const removeSeperators = /(","|":")/g;
	outputString = outputString.replace(removeSeperators,' ');
	outputString = outputString.replace(/""/g,' ');
	outputString = outputString.replace(/closes/g,"-");
	outputString = outputString.replace(/"|opens/g,"");
	result = result + outputString;
	result = result.replace(/\s+/g,' ');
	result = result.replace(/(\.[0-9]{2}\.)\s([0-9]{2}\.)/g,(_1,_2,_3)=>{
		return _2 + " - " + _3;
	});
	result = result.replace(/(:[0-9][0-9])\s([0-9][0-9]:)/g,(_1,_2,_3)=>{
		return _2 + " - " + _3;
	});
	result = convert(result);
	return result;
}
