function createElement({name, inner, classname}) {
	let elem = document.createElement(name);
	if (inner) {
		elem.innerHTML = inner;
	}
	if (classname) {
		elem.className = classname;
	}
	return elem;
}
