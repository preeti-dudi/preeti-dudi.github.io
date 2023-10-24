const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
            console.log(entry.target);
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}
	});
});
document.addEventListener('DOMContentLoaded', function () {
	const hiddenElement = document.querySelectorAll('.hidden');
	hiddenElement.forEach((el) => observer.observe(el));
});
