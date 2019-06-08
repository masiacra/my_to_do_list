/*
 * 
 * Обработчик запросов типа POST
 * 
 */


//Dependencies
const helpers = require('./helpers');


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
	console.log(body);


};


//пока не разобрался с sql инъекциями, это функция-заглушка
function isValidData(data) {
	return true;
}




module.exports = postHandler;
