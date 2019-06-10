/*
 * 
 * Инициализирующий скрипт
 * 
 */ 

//Зависимости
//Стандартные модули
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
//Собственные модули
const getHandler = require('./lib/getHandler');
const postHandler = require('./lib/postHandler');
const deleteHandler = require('./lib/deleteHandler');
const helpers = require('./lib/helpers');

//Глобальные переменные
const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1';
const server = http.createServer(serve);


server.listen(PORT, HOST, () => {
	console.log(`Server running at ${HOST}:${PORT}`);
});






const router = {
	'get': getHandler.handle,
	'post': postHandler.handle,
	'delete': deleteHandler.handle
};


function serve(req, res) {
	
	//Получаем заголовок аутентификации
	const authHeader = req.headers.authorization;
	//Если пользователь не аутентифицирован, то возвращаем статус код 401
	if (!authHeader) {
		helpers.send401(res);
		return;
	}
	
	const auth = Buffer(authHeader.split(' ')[1], 'base64')
		.toString()
		.split(':');
	
	const user = auth[0];
	const pass = auth[1];
	
	
	//Если логин и пароль неправильные, то снова просим "представиться"
	if (user !== 'foo1' || pass !== 'bar1') {
		helpers.send401(res);
		return;
	} 


	
	
	//Получаем url и парсим
	const parsedUrl = url.parse(req.url, true);
	//Получаем путь и удаляемс слэши
	let npath = parsedUrl.pathname;
	if (~npath.indexOf('\0')) {
		res.statusCode = 400;
        res.end("Bad Request");
        return;
	}
	npath = npath.replace(/^\/+|\/+$/g, '');
	//Получаем метод запроса
	const method = req.method.toLowerCase();
	
	//Получаем query string
	const queryString = parsedUrl.query;
	
	//Инициализируем декодер буфера
	const decoder = new StringDecoder('utf8');
	
	
	let buffer = '';
	
	req.on('data', (chunk) => {
		buffer += decoder.write(chunk);
		//Если данных много ~~~1 мб, то обрываем соединение
		if (buffer.length > 1e6) { 
			req.connection.destroy();
		}
	});
	req.on('end', () => {
		buffer += decoder.end();
		
		
		
		const chosenHandler = router[method];
		
		const data = {
			npath,
			res,
			queryString,
			body: parseJsonToObject(buffer)
		};
		
		chosenHandler(data);
		
	});
		
}


//Преобразование строки в объект
function parseJsonToObject(str) {
	try {
		const obj = JSON.parse(str);
		return obj;
	} catch(e) {
		return {};
	}
}
