class Form {
	constructor(form) {
		this.form = form;
		this.form.onclick = this._onClick.bind(this);
		this.form.onsubmit = () => {return false;};
		this.indicator = false;
	}
	
	send() {
		let value = this.form.act.value;
		//console.log('warning');
		if (!this.isValid(value)) {
			if (!this.indicator) {
				this.indicator = true;
				let warning = this.form.getElementsByClassName("warning")[0];
				warning.classList.remove('hidden');
				this.form.act.classList.add('attention');
			}

			return;
		}
		if (this.indicator) {
			this.indicator = false;
			let warning = this.form.getElementsByClassName("warning")[0];
			warning.classList.add('hidden');
			this.form.act.classList.remove('attention');
		}
		let data = 'act=' + encodeURIComponent(value);
		this.form.act.value = '';
		sendData(data);
		let evt = new Event('send data', {bubbles: true});
		this.form.dispatchEvent(evt);
	}
	
	isValid(data) {
		if (!/\w/.test(data)) {
			return false;
		} else {
			return !/[\[\]\{\}\(\)\\\/#@%\$\^\&\*\|<>\+\=]/.test(data);
		}
	}
	
	_onClick(event) {
		let target = event.target;
		if (!target.classList.contains('btn')) return;
		this.send();
	}
	
}
