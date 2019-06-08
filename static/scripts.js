const list = new class {
	constructor(elem) {
		this.elem = elem;
		this.elem.onclick = this._onClick.bind(this);
	}
	
	render(data) {
		//Вспомогательная функция для создания элементов "на лету"
		function createElement({name, inner, classname}) {
			let elem = document.createElement(name);
			if (inner) {
				elem.innerHTML = inner;
			}
			if (classname) {
				elem.className = classname;
			}
			return elem;
		}		
		
		data = typeof(data) === 'object' && data instanceof Array ?
			data : null;
		if (data) {
			if (data.length === 0) {
				this.elem.innerHTML = 'You have not added a single case';
			} else {
				let ol = createElement({name: 'ol'});
				for (let obj of data) {
					let li = createElement({name: 'li', inner: obj.act});
					li.dataset.id = obj.id;
					li.appendChild( createElement({name: 'button', 
						inner: 'delete', classname: 'delete'}) );
						
					ol.appendChild(li);
				}
				this.elem.innerHTML = '';
				this.elem.appendChild(ol);
			}
		} else {
			console.error('Incorrect data format');
			this.reportAnError();
		}
	}
	
	reportAnError() {
		this.elem.innerHTML = 'Sorry, some server problems';
	}
	
	clearElement(id) {
		const itemToRemove = this.elem.querySelector(`li[data-id='${id}']`);
		const parent = itemToRemove.parentNode;
		parent.removeChild(itemToRemove);  
	}
	
	_onClick(event) {
		const target = event.target;
		if (target.tagName !== 'BUTTON') return;
		let evt = new CustomEvent('delete', {
			bubbles: true, 
			detail: target.parentNode.dataset.id
		});
		this.elem.dispatchEvent(evt);		
	}
	
	
}(document.body.getElementsByClassName('list')[0]);


const ee = new class {
	constructor(elem) {
		this.eventEmitter = elem;
	}
	
	on(name, fn) {
		this.eventEmitter.addEventListener(name, fn);
	}
	
}(document);


const xhr = new class {
	constructor(url) {
		this.url = url;
	}
	get(cb) {
		const xml = new XMLHttpRequest();
		xml.open('GET', this.url, true);
		xml.send();
		xml.onload = function() {
			cb(null, JSON.parse(this.responseText));
		};
		xhr.onerror = function() {
			cb('Ошибка ' + this.status);
		};
	}
	
	delete(body, cb) {
		const xml = new XMLHttpRequest();
		xml.open('DELETE', this.url, true);	
		body = JSON.stringify(body);	
		xml.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xml.send(body);
		xml.onload = function() {
			if (xml.status !== 200) {
				cb(new Error('Ошибка удаления. Статус ' + xml.status));
				return;
			}
			cb(null);
		};
		xml.onerror = function() {
			cb(new Error('Ошибка удаления'));
		};
	}
	
}('/list');


const form = new class {
	constructor(form) {
		this.form = form;
		this.form.onclick = this._onClick.bind(this);
		this.form.onsubmit = function() {
			return false;
		};
		this.indicator = false;
	}
	
	_onClick(event) {
		const target = event.target;
		if (!target.classList.contains('btn')) return;
		let fieldAct = this.form.act;
		let data = fieldAct.value;
		if (this.isValid(data)) {
			if (this.indicator) {
				this.turnOffAlarm();
			}
			fieldAct.value = '';
			const evt = new CustomEvent('my_submit', {
				bubbles: true,
				detail: data
			});
			this.form.dispatchEvent(evt);
		} else {
			this.enableAlarm();
		}

	}
	
	enableAlarm() {
		if (!this.indicator) {
			this.indicator = true;
			let warning = this.form.getElementsByClassName("warning")[0];
			warning.classList.remove('hidden');
			this.form.act.classList.add('attention');
		}	
	}
	
	turnOffAlarm() {
		this.indicator = false;
		let warning = this.form.getElementsByClassName("warning")[0];
		warning.classList.add('hidden');
		this.form.act.classList.remove('attention');
	}
	
	isValid(data) {
		if (!/\w/.test(data)) {
			return false;
		} else {
			return !/[\[\]\{\}\\\/#%\^\*\|<>\+\=]/.test(data);
		}
	}
	
	
}(document.forms[0]);



ee.on('DOMContentLoaded', () => {
	xhr.get((err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		list.render(data);
	});
});

ee.on('delete', function(event) {
	const id = event.detail;
	const body = {
		id
	};
	xhr.delete(body, (err) => {
		if (err) {
			console.error(err);
			return;
		}
		list.clearElement(id);
	});
});

ee.on('my_submit', (event) => {
	const data = event.detail;
	const body = {
		act: data
	};
	console.log(body);
});
