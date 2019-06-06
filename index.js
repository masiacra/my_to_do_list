/*
 * 
 * Инициализирующий скрипт
 * 
 */ 

//Зависимости
const db = require('./lib/db');
const http = require('http');
const PORT = process.env.PORT || 5000;
const url = require('url');
const getHandler = require('./lib/getHandler');
const postHandler = require('./lib/postHandler');
const deleteHandler = require('./lib/deleteHandler');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(serve);


server.listen(PORT, () => {
	console.log(`Сервер слушает порт ${PORT}`);
});






const router = {
	'get': getHandler.handle,
	'post': postHandler.handle,
	'delete': deleteHandler.handle
};


function serve(req, res) {
	
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
