/*
 * 
 * 
 * 
 */

//Dependencies
const fs = require('fs');


//Контейнер для всех методов
const helpers = {};


helpers.readfile = (filepath, cb) => {
	fs.readFile(filepath, (err, data) => {
		if (err) {
			cb(err);
			return;
		}
		cb(null, data);
	});
};

helpers.badReques = res => {
	res.statusCode = 400;
	res.end();
};


helpers.notFound = res => {
	res.statusCode = 404;
	res.end('Not Found');
};

helpers.serverError = (res, comment = '') => {
	res.statusCode = 500;
	res.end(comment);
};


module.exports = helpers;
