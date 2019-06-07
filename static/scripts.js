const list = new class {
	constructor(elem) {
		this.elem = elem;
		this.elem.onclick = this._onClick.bind(this);
	}
	
	render(err, data) {
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
		
		if (err) {
			console.log(err);
			this.reportAnError();
			return;
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
	get(cb) {
		const xml = new XMLHttpRequest();
		xml.open('GET', '/list', true);
		xml.send();
		xml.onload = function() {
			//console.log(this.responseText);
			cb(null, JSON.parse(this.responseText));
		};
		xhr.onerror = function() {
			cb('Ошибка ' + this.status);
		};
	}
}();




ee.on('DOMContentLoaded', () => {
	xhr.get(list.render.bind(list));
});

ee.on('delete', function(event) {
	console.log(event.detail);
});
