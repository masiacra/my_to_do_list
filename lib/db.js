/*
 * 
 * 
 *Модуль для работы с mysql
 *  
 * 
*/

//Зависимости
const mysql = require('mysql');


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'admin_cock',
	password: 'parol',
	database: 'url_shortener_DB'
});


//Контейнер для всех методов
const db = {};


//Метод get
//Выполянет запрос к базе данных на передачу определенных сведений
db.get = (query, cb) => {
	connection.query(query, (err, results) => {
		if (err) { 
			cb(err);
			return;
		}
		cb(null, results);
	});
};


//Метод post
db.post = (query, obj, cb) => {
	connection.query(query,  obj, (err, result) => {
			if (err) {
				cb(err);
				return;
			}
			cb(null, result);
	});
};

//Метод delete 
db.delete = (query, param, cb) => {
	connection.query(query, param, (err, resut) => {
		if (err) {
			cb(err);
			return;
		}
		cb(null, result);
	}); 
};





module.exports = db;
