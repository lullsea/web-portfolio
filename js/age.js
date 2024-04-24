let age = document.getElementById("age");

setInterval(() => {
	let time = (new Date() - new Date("August 31, 2004 12:00:00")) / (1000 * 60 * 60 * 24 * 365.25); // milliseconds per year
	age.innerText = time.toString().substring(0, 12);
}, 50);