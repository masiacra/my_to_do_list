function parse(str) {
	str = str.replace('act=', '');
	str = str.replace(/%20/g, ' ');
	return str;
}


module.exports = { parse };
