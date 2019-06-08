/*
 * 
 * Обработчик запросов типа DELETE
 * 
 */


//Dependencies
const db = require('./db');
const helpers = require('./helpers');

//Контейнер для всех методов
const deleteHandler = {};

//метод handle
deleteHandler.handle = (data) => {
	const {body, res, npath} = data;
	console.log(body);
	if (npath !== 'list') {
		helpers.notFound(res);
		return;
	}
	
	if (isValidId(body.id)) {
		dbDelete(body.id, (err, result) => {
			if (err) {
				console.error(err);
				helpers.serverError(res);
				return;
			}
			console.log(result);
			res.statusCode = 200;
			res.end();
		});
	} else {
		helpers.badRequest(res);
	}


};

function isValidId(id) {
	if (typeof(id) !== 'string') return false;
	id = Number(id);
	return !isNaN(id);
}

console.log(isValidId("1'+UNION+SELECT"));






//Вспомогательная оболочка над методом delete библиотеки db
function dbDelete(id, cb) {
	db.delete('DELETE from to_do_list WHERE id = ?', id, cb);
}


module.exports = deleteHandler;

