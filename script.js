const postContainer = document.getElementById('posts');
const form = document.getElementById('blogForm');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('conent');


document.addEventListener('DOMConentLoaded', ()=> {
	const savedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
	savedPosts.forEach(post => renderPost(post));
});

form.addEventListener('submit', function(e){
	e.preventDefault();

const title = titleInput.value.trim();
const content = contentInput.value.trim();
const date = new Date().toLocaleDateString();


if (title && content){
	const newPost = {title, content, date};

	const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
	posts.unshift(newPost);
	localStorage.setItem('blogPosts', JSON.stringify(posts));
	renderPost(newPost);
	form.reset();	
}
});

function renderPost(post){
	const postEl = document.createElement('div');
	postEl.classname = 'post';
	postEl.innerHTML = `
		<h3>${post.title}</h3>
		<h3>${post.content}</h3>
		<small>Posted on ${post.date}</small
	`;
} 

