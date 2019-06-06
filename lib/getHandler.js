/*
 * 
 * Обработчик get запросов
 * 
 */ 

//Dependencies
const fs = require('fs');
const path = require('path');


//Контейнер для всех методов 
const getHandler = {}; 
 
getHandler.handle = (data) => {
	const {npath, queryString, res} = data;
	const route = router[npath];
	if (route) {
		route(res);
		return;
	}
	notFound(res);
}; 

const router = {
	'': displayWrapper('index.html'),
	'styles.css': displayWrapper('styles.css'),
	'scripts.js': displayWrapper('scripts.js'),
	'favicon.ico': displayWrapper('favicon.ico')
};

function notFound(res) {
	res.statusCode = 404;
	res.end('Not found');
}


function displayWrapper(filename) {
	
	const mime = filename.split('.')[1];
	
	const mimes = {
		'html': "text/html",
		'css': "text/css",
		'js': 'text/javascript',
		'ico': 'image/x-icon'
	};
	const header = mimes[mime];
	return sendFile;
	
	function sendFile(res) {
		const filepath = path.join(__dirname, '../static', filename);
		//return(filepath);
		const file = new fs.ReadStream(filepath);
		res.setHeader('Content-Type', header);
		file.pipe(res);

	
		file.on('error', (err) => {
			res.statusCode = 500;
			res.end('Server error');
			console.log(err);
		});
	
		file.on('close', () => {
			file.destroy();
		});
	
	
	}
}

//console.log(displayWrapper('index.html')())



 
 
module.exports = getHandler;
