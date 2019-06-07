/*
 * 
 * Обработчик запросов типа DELETE
 * 
 */


//Dependencies
const db = require('./db');


//Контейнер для всех методов
const deleteHandler = {};

//метод handle
deleteHandler.handle = (data) => {
	const {body, res, npath} = data;
	console.log(body);
	if (npath !== 'list') {
		res.statusCode = 404;
		res.end('Not found');
		return;
	}
	
	if (isValidId(body.id)) {
		dbDelete(body.id, (err, result) => {
			if (err) {
				console.error(err);
				res.statusCode = 500;
				res.end();
				return;
			}
			console.log(result);
			res.statusCode = 200;
			res.end();
		});
	} else {
		badRequest(res);
	}


};

function isValidId(id) {
	id = Number(id);
	return !isNaN(id);
}

function badRequest(res) {
	res.statusCode = 400;
	res.end();
}


//Вспомогательная оболочка над методом delete библиотеки db
function dbDelete(id, cb) {
	db.delete('DELETE from to_do_list WHERE id = ?', id, cb);
}


module.exports = deleteHandler;

