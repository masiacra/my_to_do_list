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
	const safeBody = {act: mysql_real_escape_string(body.act)};
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


//Заменяем специальные символы
//В php их экранируют
function mysql_real_escape_string(data) {

	return data.replace(/\\/g, '\\\\')
				.replace(/\x00/g, '\\x00')
				.replace(/\n/g, '\\n')
				.replace(/\r/g, '\\r')
				.replace(/'/g, "\\'")
				.replace(/"/g, '\\"')
				.replace(/\x1a/g, '\\x1a');
}

//console.log(mysql_real_escape_string('\x00 asasa \n sdaasas \r asdasd \\ sasda \' sadasd " weadsa \\ sads \x1a'));
//console.log(mysql_real_escape_string(`\x00 asasa \n sdaasas \r asdasd \ sasda ' sadasd " weadsa\ sads \x1a`) === `\\x00 asasa \\n sdaasas \\r asdasd sasda \' sadasd \" weadsa sads \\x1a`);





module.exports = postHandler;
