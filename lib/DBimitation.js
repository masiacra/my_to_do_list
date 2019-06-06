/*
 * 
 *since it is necessary to use a credit card to work with mySQL on 
 *heroku, I replaced the database with json files 
 * 
 */ 

//Dependencies
const helpers = require('./helpers');
const path = require('path');
const fs = require('fs');

//Container for all methods
const db = {};




//Method getFromDB
//We are looking for a file in the directory with the same name as the 
//qualifying parameter in the database query string
db.getFromDB = (query, cb) => {
	let filepath;
	if (query.indexOf('SELECT longUrl FROM urls WHERE shortUrl') > -1) {
		const reg = /[a-z]{3}[0-9]{4}/
		let filename = query.match(reg);
		if (!filename) {
			console.log(query);
			cb(null, []);
			return;
		}
		filename = filename[0];
		filepath = path.join(__dirname, '../data/urls/shortUrl', 
			filename + '.json');
	} else {
		const reg = new RegExp('http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(\/.*)?', 
			'i');
		filename = query.match(reg);
		if (!filename) {
			cb(new Error('Some problems with define of url'));
			return;
		}
		filename=filename[0].replace(/http(s)?:\/\//, '');
		filename = filename.replace(/[\/\.]/g, '_');
		filepath = path.join(__dirname, '../data/urls/longUrl', 
			filename + '.json');
	}

	fs.open(filepath, 'r+', (err, fd) => {
		if (err) {
			cb(null, []);
			return;
		}
		fs.readFile(filepath, 'utf8', (err, data) => {
			if (err) {
				cb(err);
				return;
			}
			cb(null, [JSON.parse(data)]);
			fs.close(fd, (err) => {
				console.error(err);
			});
		});
	});

	
};


db.addToDB = (str, rec, cb) => {
	let {longUrl, shortUrl} = rec;
	const modifiedLongUrl = longUrl.replace(/http(s)?:\/\//, '').replace(/[\/\.]/g, '_');
	const filepath1 = path.join(__dirname, '../data/urls/longUrl',
		modifiedLongUrl + '.json');
	const filepath2 = path.join(__dirname, '../data/urls/shortUrl', 
		shortUrl + '.json');
	
	const rec1 = JSON.stringify({ shortUrl });
	const rec2 = JSON.stringify({ longUrl });
	
	
	fs.writeFile(filepath2, rec2, 'utf8', (err) => {
		if (err) {
			cb(err);
			return;
		}
		fs.writeFile(filepath1, rec1, 'utf8', (err) => {
			if (err) {
				cb(err);
				return;
			}
			cb(null, rec);
		});
	});
	
};








module.exports = db;
