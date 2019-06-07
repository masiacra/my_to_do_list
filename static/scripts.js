const list = new class {
	constructor(elem) {
		this.elem = elem;
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
			data :null;
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
			this.reportAnError();
		}
	}
	
	reportAnError() {
		this.elem.innerHTML = 'Sorry, some server problems';
	}
	
	

	
	
	
	
}(document.body.getElementsByClassName('list')[0]);
