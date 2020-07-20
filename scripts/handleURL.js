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
	var mrContentResponse = "", mrTagResponse = "", jsonResponse = "";
	
	// Microdata and RDFa for schema.org/openingHours (ignoring openingHoursSpecification for MD and RDFA for now)
	var microRdfaContentRegex = /<[^>*] (property|itemprop)=['"]openingHours['"][^>*]?content=('([^']*)'|"([^"]*)")[^>*]?>/gi
	var microRdfaTagRegex     = /<[^>*] (property|itemprop)=['"]openingHours['"][^>*]?>([^<]*)</gi

	// Microdata or RDFa matching with content attribute
	let outputString = " ";
	do {
		m = microRdfaContentRegex.exec(string);
		if (m) {
			outputString = outputString + m[2] + " ";
		}
	} while(m);
	if (convert(outputString) === "No valid input") {
		mrContentResponse = "";
	} else {
		mrContentResponse = convert(outputString);
	}
	
	// Microdata or RDFa matching with content in tag
	outputString = " ";
	do {
		m = microRdfaTagRegex.exec(string);
		if (m) {
			outputString = outputString + m[2] + " ";
		}
	} while(m);
	if (convert(outputString) === "No valid input") {
		mrTagResponse = "";
	} else {
		mrTagResponse = convert(outputString);
	}

	// JSON+LD for openingHours and openingHoursSpecification, ignoring validFrom validTil for now
	outputString = " ";
	let el = document.createElement("html");
	el.innerHTML = string;
	let scripts = "" + $(el).find("[type='application/ld+json']").html();
	if (scripts != "") {
		var jsonLd = JSON.parse(scripts);
		var jsonOH = jsonLd.openingHours;
		if (!(jsonOH === undefined)) {
			if (Array.isArray(jsonOH)) {
				for (i in jsonOH) {
					outputString = outputString + jsonOH[i] + " ";
				}
			} else {
				outputString = outputString + jsonOH + " ";
			}
		}
		var jsonOHS = jsonLd.openingHoursSpecification;
		if (!(jsonOHS === undefined)) {
			if (Array.isArray(jsonOHS)) {
				for (i in jsonOHS) {
					outputString = outputString + " " + jsonOHS[i].dayOfWeek + " " + jsonOHS[i].opens + "-" + jsonOHS[i].closes;
				}
			} else {
				outputString = outputString + " " + jsonOHS.dayOfWeek + " " + jsonOHS.opens + "-" + jsonOHS.closes;
			}
		}
	}
	if (convert(outputString) === "No valid input") {
		jsonResponse = "";
	} else {
		jsonResponse = convert(outputString);
	}
	
	let result = (mrContentResponse + " " + mrTagResponse + " " + jsonResponse).trim();
	if (result === ""){
		result = "No valid input";
	}
	return result.trim();
}
