/*
 * 
 * Обработчик get запросов
 * 
 */ 

//Dependencies
const fs = require('fs');
const path = require('path');
const db = require('./db');



//Контейнер для всех методов 
const getHandler = {}; 
 
getHandler.handle = (data) => {
	const {npath, queryString, res} = data;
	const router = route[npath];
	if (router) {
		router(res);
		return;
	}
	notFound(res);
}; 

const route = {
	'': displayWrapper('index.html'),
	'styles.css': displayWrapper('styles.css'),
	'scripts.js': displayWrapper('scripts.js'),
	'favicon.ico': displayWrapper('favicon.ico'),
	'list': passList
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


function passList(res) {
	
	function handleResultsOfDB(err, data) {
		if (err) {
			console.error(err);
			res.statusCode = 500;
			res.end('Some problems with DB');
			return;
		}
		res.statusCode = 200;
		res.end(JSON.stringify(data));
		
	}
	
	db.get('SELECT id, act FROM to_do_list', handleResultsOfDB);
}





 
 
module.exports = getHandler;
