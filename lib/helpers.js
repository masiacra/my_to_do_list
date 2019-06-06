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



module.exports = helpers;
