class Form {
	constructor(form) {
		this.form = form;
	}
	
	send() {
		let value = this.form.act.value;
		if (!this.isValid(value)) return;
		let data = 'act=' + encodeURIComponent(value);
		sendData(data);
		this.form.act.value = '';
	}
	
	isValid(data) {
		if (!/\w/.test(data)) {
			return false;
		} else {
			return !/[\[\]\{\}\(\)\\\/#@%\$\^\&\*\|<>\+\=]/.test(data);
		}
	}
	
}
