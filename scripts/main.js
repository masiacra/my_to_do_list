const list = new List(document.body.getElementsByClassName('list')[0]);

getData(list.render.bind(list));

const form = new Form(document.forms[0]);

document.body.addEventListener('send data', () => {
	getData(list.render.bind(list));
});
