function getData(cb) {

	let xhr = new XMLHttpRequest();

	xhr.open('GET', '/new_test', true);

	xhr.onload = function() {
		let parseText = JSON.parse(this.responseText);
		cb( parseText );
	}

	xhr.onerror = function() {
		console.log( 'Error ' + this.status );
	}

	xhr.send();
}


function sendData(data) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', '/submit', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(data);
}

function deleteData(id) {
	let req = 'id=' + id;
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', '/delete', true);
	xhr.setRequestHeader("Content-Type", "text/plain");
	xhr.send(req); 
}


//getData(console.log);
