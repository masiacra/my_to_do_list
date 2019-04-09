function createElement({name, inner}) {
	let elem = document.createElement(name);
	if (inner) {
		elem.innerHTML = inner;
	}
	return elem;
}
