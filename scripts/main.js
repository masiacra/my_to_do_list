let div = new List(document.body.getElementsByTagName('div')[0]);

getData(div.render.bind(div));

const form = new Form(document.forms[0]);

const btn = document.body.getElementsByClassName('btn')[0];
btn.onclick = function() {
	form.send();
	getData(div.render.bind(div));
};
