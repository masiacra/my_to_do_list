const mysql = require('mysql');


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'admin_cock',
	password: 'parol',
	database: 'to_do_list_DB'
});


function getInfoFromDB(res) {
	connection.query("SELECT id, act FROM to_do_list;", (err, results) => {
		if (err) { 
			console.error(err);
			return;
		}
		console.log(results);
		let result = [];
		for (let obj of results) {
			result.push({id: obj.id, act: obj.act.toString()});
		}
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(JSON.stringify(result));
		res.end();
	});
}


function addIntoDB(data) {
	let obj = {
		act: data
	};
	connection.query(`INSERT INTO to_do_list SET ?`,  obj,
		(err, res) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(res);
	});
}

function deleteFromDB(id) {
	connection.query(`DELETE FROM to_do_list WHERE id = ?`, id, 
		(err, result) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(result);
		});
}

module.exports = { 
	getInfoFromDB,
	addIntoDB,
	deleteFromDB
};
