class List {
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

		if (data) {
			if (data.length != 0) {
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
			} else {
				this.elem.innerHTML = 'You have not added a single case';
			}
		} else {
			this.elem.innerHTML = "Sorry, we have some problems";
		}
	}
	
	
	_onClick(event) {
		
		function deleteElem(target) {
			let parent = target.parentNode;
			let id = parent.getAttribute('data-id');
			deleteData(id);
			parent.parentNode.removeChild(parent);
		}
		
		
		let target = event.target;
		if (target.tagName != 'BUTTON') return;
		deleteElem(target);
	}

}
