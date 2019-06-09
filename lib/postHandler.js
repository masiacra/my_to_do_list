/*
 * 
 * Обработчик запросов типа POST
 * 
 */


//Dependencies
const helpers = require('./helpers');
const db = require('./db');




//Контейнер для всех методов
const postHandler = {};

//метод handle
postHandler.handle = (data) => {
	const {npath, res, body} = data;
	if (npath != 'list') {
		helpers.notFound(res);
		return;
	}
	if (!isValidData(body)) {
		helpers.badRequest(res);
		return;
	} 
	db.post('INSERT INTO to_do_list SET ?',  body, (err, result) => {
		if (err) {
			console.error(err);
			helpers.serverError(res);
			return;
		}
		console.log(result);
		res.statusCode = 200;
		res.end();
		
	});
	
	


};


//пока не разобрался с sql инъекциями, это функция-заглушка
function isValidData(data) {
	return true;
}






module.exports = postHandler;
