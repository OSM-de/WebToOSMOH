//removes any word or number longer then 4 digits and two/three letter words that were specified also turns # into the correct syntax
function removeUnwantedText(input) {
	input = input.replace(/['!©«»&@]/g,"");
	input = input.replace(/&nbsp;/g," ");
	input = input.replace(/&ndash;/g,"-");
	input = input.replace(/<(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>|{.+?}/g,"").trim();
	input = input.replace(/".+?"|[a-z]+@[a-z]+.[a-z]+/g,"");
	input = input.replace(/[äüöéèàáßçâ=<>"{}$£@¦°§¬¢[\]'_?()!\\]/gi, "");
	input = input.replace(/([a-z]{4,}|[0-9]{3,})/gi, "");
	input = input.replace(/in|\ban|am|pm|on/gi, "");
	input = input.replace(/Uhr|von|now|===|vom|der|die|das|new|img|row|add|sie|uns|\b[A-Z]\b|[()]/gi, "");
	input = input.replace(/\-##\:##/g, "+");
	input = input.replace(/#/g, "off");
	input = input.replace(/\s+/g, " ");
	return input;
}
