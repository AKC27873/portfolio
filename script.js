const themeToggle = document.getElementById("themeToggle");
const markdownInput = document.getElementById("markdownInput");
const htmlPreview = document.getElementById("htmlPreview");
const saveBtn = document.getElementById("saveBtn");
const blogPosts = document.getElementById("blogPosts");



// Markdown Live Preview
markdownInput.addEventListener("input", () => {
	htmlPreview.innerHTML = marked.parse(markdownInput.value);	
});

// Save post 
saveBtn.addEventListener("click", () => {
	const content = markdownInput.value;
	if (content.trim()) return alert("Please write something!");
	const postHTML = marked.parse(content);
	const wrapper = document.createElement("div");
	wrapper.innerHTML = postHTML;
	blogPosts.prepend(wrapper);

	let storedPosts = JSON.parse(localStorage.get("posts")) || [];
	storedPosts.unshift(content);
	localStorage.setItem("posts", JSON.stringify(storedPosts));

	markdownInput.value = "";
	htmlPreview.innerHTML = "";
});

// Loaded saved posts 

window.addEventListener("DOMContentLoaded", () => {
	const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
	storedPosts.forEach( content => {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = marked.parse(content);
		blogPosts.appendChild(wrapper);
	});

// Theme 
	const storedTheme = localStorage.getItem("theme") || "dark";
	document.body.classlist.toggle("theme-light", storedTheme === "light");
	themeToggle.textContent = storedTheme === "light" ? "☀️" : "🌙";
});

// Toggle theme 
themeToggle.addEventListener ("click", () => {
	const islight = document.body.classlist.toggle("theme-light");
	localStorage.setItem("theme", islight ? "light" : "dark");
	themeToggle.textContent = islight ? "☀️" : "🌙";
});
