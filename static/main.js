const list = new List(document.body.getElementsByClassName('list')[0]);

list.render();

const form = new Form(document.forms[0], list.render.bind(list));



/*
document.body.addEventListener('send data', () => {
	console.log('sending data');
	list.render();
});

*/
