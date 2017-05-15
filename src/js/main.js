document.body.addEventListener('click', function(e) {
	alert('Congrats, you just clicked on a "' + e.target.localName + '" tag');
	console.log(true);
});