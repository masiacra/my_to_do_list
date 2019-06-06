class Form {
	constructor(form, cb) {
		this.form = form;
		this.form.onclick = this._onClick.bind(this);
		this.form.onsubmit = () => {return false;};
		this.indicator = false;
		this.cb = cb;
	}
	
	send() {
		let value = this.form.act.value;
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
		let self = this;
		fetch('/submit', {method: 'POST', 
			headers:  {"Content-Type": "text/plain"},
			body: data})
			.then( function(response) {
				console.log(response.status);
				//console.log(this.cb);
				self.cb();

			}, err => {
				console.error(err);
			});
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
