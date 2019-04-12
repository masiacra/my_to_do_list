const fs = require('fs');

function readfile(path, res, header) {
	fs.readFile(path, (err, data) => {
		if (err) throw err;
		res.writeHeader(200, header);
		res.write(data);
		res.end();
	});
}

readfile.headers = {
	'js': {"Content-Type": 'text/javascript'},
	'html': {"Content-Type": 'text/html'},
	'css': {"Content-Type": 'text/css'}
};

module.exports = {readfile};
