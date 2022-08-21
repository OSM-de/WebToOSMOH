function handlePM(input) {
	const findAMPM = /\b([0-9]{2}[.:][0-9]{2}|[0-9]?[0-9]|[0-9][.:][0-9]{2}|[0-9]{2}\h[0-9]{2})\s?[ap][m]/gi;
	input = input.replace(findAMPM,(_1)=>{
		let temp = moment(_1,["hh A","hh a","h A","h a","h.mm A","h.mm a","hh.mm A","hh.mm a","hh\hmm A","hh\hmm a"]);
		return temp.format("HH:mm");
	});
	input = input.replace(/\s+/g, " ");
	return input;
}
