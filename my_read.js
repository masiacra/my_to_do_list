const fs = require('fs');

function readfile(path, res, header) {
	if (path === '/favicon.ico') {
		let stream = fs.createReadStream('.' + path);
		stream.pipe(res);
		return;
	} else {
		fs.readFile(path, (err, data) => {
			if (err) throw err;
			res.writeHeader(200, header);
			res.write(data);
			res.end();
		});
	}
}

readfile.headers = {
	'js': {"Content-Type": 'text/javascript'},
	'html': {"Content-Type": 'text/html'},
	'css': {"Content-Type": 'text/css'}
};

module.exports = {readfile};
