function handleHTMLinput() {
	var output = "";
	// get htmlArea content
	inputHtml = document.getElementById('htmlArea').innerHTML;
	// remove all tags and replace with a space
	var regex = /(<([^>]+)>)/ig;
	output = inputHtml.replace(regex, " ");
	// create a temporary div and put the remainder there
	var element = document.createElement('div');
	element.innerHTML = output;
	// get the text content (decodes HTML entities)
	output = element.textContent;
	// set inputArea content
	document.getElementById('inputArea').innerText = output;
	// remove htmlArea content
	document.getElementById('htmlArea').innerHTML = '';
}