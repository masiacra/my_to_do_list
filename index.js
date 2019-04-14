const my_read = require('./my_read');

const db = require('./db');

const http = require('http');

console.log('server is running');

http.createServer((req, res) => {
	
	console.log(req.url);
	if (req.url === '/') {
		my_read.readfile('./pages/index.html', res, 
			my_read.readfile.headers["html"]);
	} else if (req.url === '/scripts/ajax.js') {
		my_read.readfile('./scripts/ajax.js', res, 
			my_read.readfile.headers["js"]);
	} else if (req.url === '/new_test') {
		db.getInfoFromDB(res);
	} else if (req.url === '/scripts/list.js') {
		my_read.readfile('./scripts/list.js', res, 
			my_read.readfile.headers["js"]);
	} else if (req.url === '/scripts/main.js') {
		my_read.readfile('./scripts/main.js', res, 
			my_read.readfile.headers["js"]);
	} else if (req.url === '/scripts/form.js') {
		my_read.readfile('./scripts/form.js', res, 
			my_read.readfile.headers["js"]);
		
	} else if (req.url === '/submit') {
		let postData = '';
		req.addListener('data', (postDataChunk) => {
			postData += postDataChunk;
		});
		req.addListener('end', () => {
			postData = parse(postData);
			db.addIntoDB(postData);
		});
	} else if (req.url === '/scripts/create_element.js') {
		my_read.readfile('./scripts/create_element.js', res, 
			my_read.readfile.headers["js"]);
	} else if (req.url === '/delete') {
		let delData = '';
		req.addListener('data', data => {
			console.log(data.toString());
			delData += data;
		});
		req.addListener('end', () => {
			let id = delData.match(/\d+/);
			if (id) {
				id = id[0];
				db.deleteFromDB(id);
			}
		});
	} else if (req.url === '/favicon.ico') {
		my_read.readfile('./favicon.ico', res);
	} else if (req.url === '/styles/custom.css') {
		my_read.readfile('./styles/custom.css', res, 
			my_read.readfile.headers['css']);
	} else {
		res.statusCode = 400;
		res.write("Not found");
		res.end();
	}
	
}).listen(3000);

//вспомогательная функция для парсинга данных post-запроса
function parse(str) {
	str = str.replace('act=', '');
	str = str.replace(/%20/g, ' ');
	return str;
}


