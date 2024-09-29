
//for animate on scroll
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}
	});
});


function hslToHex(h, s, l) {
	l /= 100;
	const a = s * Math.min(l, 1 - l) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

// Function to update the CSS variables
function coordinatedColorPalette() {
	// Generate a random primary hue
	const primaryHue = Math.floor(Math.random() * 360);
	const primarySaturation = 20 + Math.floor(Math.random() * 30); // Saturation: 60-90%
	const primaryLightness = 60 + Math.floor(Math.random() * 30);  // Lightness: 60-90%

	// Create the primary color
	const color1 = hslToHex(primaryHue, primarySaturation, primaryLightness);

	// Create a complementary color (offset the hue by 180 degrees)
	const complementaryHue = (primaryHue + 180) % 360;
	const color2 = hslToHex(complementaryHue, primarySaturation, primaryLightness);

	// Create an analogous color (adjust hue slightly, e.g., +30 degrees)
	const analogousHue = (primaryHue + 30) % 360;
	const color3 = hslToHex(analogousHue, primarySaturation, primaryLightness - 50);

	document.getElementById('colorPicker1').value = color1;
	document.getElementById('colorPicker2').value = color2;
	document.getElementById('colorPicker3').value = color3;
}

function changeColorPalette(){
	
	const color1 = document.getElementById('colorPicker1').value;
	const color2 = document.getElementById('colorPicker2').value;
	const color3 = document.getElementById('colorPicker3').value;
	updateColorPalette(color1,color2,color3)
}

function updateColorPalette(color1,color2,color3) {
	document.documentElement.style.setProperty('--color1', color1);
	document.documentElement.style.setProperty('--color2', color2);
	document.documentElement.style.setProperty('--color3', color3);
	
	const svgImages = document.querySelectorAll('.svg-image');
	svgImages.forEach(img => {
		fetch(img.src)
        .then((response) => response.text())
        .then((svgText) => {
            // Create a DOM parser to parse the SVG text
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

            // Update the colors
            const gradients = svgDoc.querySelectorAll('stop');
            if (gradients.length > 0) {
                gradients[0].setAttribute('stop-color', color1);
                gradients[1].setAttribute('stop-color', color1);
                gradients[2].setAttribute('stop-color', color1);
            }

            const paths = svgDoc.querySelectorAll('path');
            paths.forEach(path => {
                path.setAttribute('fill', color1); 
                path.setAttribute('stroke', color3); 
            });

            // Replace the original img with the modified SVG
            img.outerHTML = new XMLSerializer().serializeToString(svgDoc.documentElement);
        })
        .catch((error) => {
			console.log("error");
			console.error(error)
		});

	}); 
}

document.addEventListener('DOMContentLoaded', function () {

	addSkills();
	addExperiences();
	addProjects();
	addSocialLinks();

	document.getElementById('coordinatedPaletteBtn').addEventListener('click', coordinatedColorPalette);
	document.getElementById('changePaletteBtn').addEventListener('click', changeColorPalette);
	const hiddenElement = document.querySelectorAll('.hidden');
	hiddenElement.forEach((el) => observer.observe(el));
});
// Create a new section element
function addSkills() {
	const skillSection = document.getElementById('skills-section');

	// Add the section title
	const title = document.createElement('h3');
	title.className = 'u-color3 xxl-text';
	title.innerHTML = 'Skills &<br />Services';
	skillSection.appendChild(title);

	// Create the container for the skills
	const skillsContainer = document.createElement('div');
	skillsContainer.id = 'skills';
	skillsContainer.className = 'content-list centre-text row-animate';

	// Define the skills array
	const skills = [
		{
			title: 'MERN',
			items: [
				{ title: 'MongoDB', src: 'assets/skills/mongo.png' },
				{ title: 'Express', src: 'assets/skills/express.png' },
				{ title: 'React', src: 'assets/skills/react.png' },
				{ title: 'Node', src: 'assets/skills/node.png' },
			],
		},
		{
			title: 'Front-end development',
			items: [
				{ title: 'HTML', src: 'assets/skills/html.png' },
				{ title: 'CSS', src: 'assets/skills/css.png' },
				{ title: 'JS', src: 'assets/skills/js.png' },
				{ title: 'React', src: 'assets/skills/react.png' },
			],
		},
		{
			title: 'Programming Languages',
			items: [{ title: 'Php', src: 'assets/skills/php.png' },
			{ title: 'JS', src: 'assets/skills/js.png' },
			{ title: 'Python', src: 'assets/skills/python.jpg' }
			],
		},
		{
			title: 'Database Management',
			items: [
				{ title: 'mySQL', src: 'assets/skills/my-sql.png' },
				{ title: 'MongoDB', src: 'assets/skills/mongo.png' },
			],
		},
		{
			title: 'Back-end Development',
			items: [
				{ title: 'Laravel', src: 'assets/skills/laravel.png' },
				{ title: 'WordPress', src: 'assets/skills/wordpress.png' },
				{ title: 'Express', src: 'assets/skills/express.png' },
				{ title: 'Node', src: 'assets/skills/node.png' },
			],
		},
		{
			title: 'Mobile Development',
			items: [
				{
					title: 'React Native',
					src: 'assets/skills/react-native.png',
				}
			],
		},
	];

	// Create skill items
	skills.forEach((skill, index) => {
		const skillDiv = document.createElement('div');
		skillDiv.className = `skill hidden br1rem p2rem mv1rem bg-color2`;
		skillDiv.style.setProperty('--order', index.toString());

		const skillTitle = document.createElement('h3');
		skillTitle.className = 'head';
		skillTitle.textContent = skill.title;
		skillDiv.appendChild(skillTitle);

		const skillList = document.createElement('ul');
		skillList.className =
			'description w80 p1rem br1rem row-list color-list ';

		skill.items.forEach((item, itemIndex) => {
			const listItem = document.createElement('li');
			listItem.style.setProperty('--order', itemIndex.toString());
			// listItem.className = 'popup';

			if (typeof item === 'string') {
				listItem.textContent = item;
			} else {
				const img = document.createElement('img');
				img.className = 'skill-image';
				img.src = item.src;
				img.alt = item.title;
				listItem.appendChild(img);
				const text = document.createElement('p');
				text.innerText = item.title;
				listItem.appendChild(text);
			}

			skillList.appendChild(listItem);
		});

		skillDiv.appendChild(skillList);
		skillsContainer.appendChild(skillDiv);
	});

	// Append the skills container to the section
	skillSection.appendChild(skillsContainer);
}
// Create a new section element
function addExperiences() {
	const experienceSection = document.getElementById('experiences-section');

	// Add the section title
	const title = document.createElement('h3');
	title.className = 'u-color3 xxl-text';
	title.innerHTML = 'Education & Work Experience';
	experienceSection.appendChild(title);

	// Create the container for the experiences
	const experiencesContainer = document.createElement('div');
	experiencesContainer.id = 'experiences';
	experiencesContainer.className = 'row-animate';

	// Define the experiences array
	const experiences = [
		{
			time: 'July 2018 - June 2022',
			title: 'BTech (I.T.)',
			place: 'Dr. A.P.J. Adbul Kalam University'
		}, {
			time: 'Jan 2021 - May 2022',
			title: 'Software Engineer Intern',
			place: 'Novoinvent Software Pvt. Lmt.'
		}, {
			time: 'June 2022 - August 2024',
			title: 'Software Engineer',
			place: 'Novoinvent Software Pvt. Lmt.'
		}
	];

	// Create experience items
	experiences.forEach((experience, index) => {
		const experienceDiv = document.createElement('div');
		experienceDiv.className = `education br1rem p2rem mv1rem bg-color2 hidden`;
		experienceDiv.style.setProperty('--order', index.toString());

		const experienceTime = document.createElement('h3');
		experienceTime.className = 'head';
		experienceTime.textContent = experience.time;
		experienceDiv.appendChild(experienceTime);


		const experienceTitle = document.createElement('h3');
		experienceTitle.className = 'head';
		experienceTitle.textContent = experience.title;
		experienceDiv.appendChild(experienceTitle);

		const experiencePlace = document.createElement('p');
		// experienceTitle.className = 'head';
		experiencePlace.textContent = experience.place;
		experienceDiv.appendChild(experiencePlace);


		experiencesContainer.appendChild(experienceDiv);
	});

	// Append the experiences container to the section
	experienceSection.appendChild(experiencesContainer);
}
// Create a new section element
function addProjects() {
	const projectSection = document.getElementById('projects-section');

	// Add the section title
	const title = document.createElement('h3');
	title.className = 'u-color3 xxl-text';
	title.innerHTML = 'Education & Work Project';
	projectSection.appendChild(title);

	// Create the container for the projects
	const projectsContainer = document.createElement('div');
	projectsContainer.id = 'projects';
	projectsContainer.className = 'row-animate';

	// Define the projects array
	const projects = [
		{
			time: 'July 2018 - June 2022',
			title: 'BTech (I.T.)',
			description: 'Dr. A.P.J. Adbul Kalam University'
		}, {
			time: 'Jan 2021 - May 2022',
			title: 'Software Engineer Intern',
			description: 'Novoinvent Software Pvt. Lmt.'
		}, {
			time: 'June 2022 - August 2024',
			title: 'Software Engineer',
			description: 'Novoinvent Software Pvt. Lmt.'
		}
	];

	// Create project items
	projects.forEach((project, index) => {
		const projectDiv = document.createElement('div');
		projectDiv.className = `education br1rem p2rem mv1rem bg-color2 hidden`;
		projectDiv.style.setProperty('--order', index.toString());

		const projectTime = document.createElement('h3');
		projectTime.className = 'head';
		projectTime.textContent = project.time;
		projectDiv.appendChild(projectTime);


		const projectTitle = document.createElement('h3');
		projectTitle.className = 'head';
		projectTitle.textContent = project.title;
		projectDiv.appendChild(projectTitle);

		const projectPlace = document.createElement('p');
		// projectTitle.className = 'head';
		projectPlace.textContent = project.description;
		projectDiv.appendChild(projectPlace);


		projectsContainer.appendChild(projectDiv);
	});

	// Append the projects container to the section
	projectSection.appendChild(projectsContainer);
}

function addSocialLinks() {
	// Data for social media links and icons
	const socialLinksData = [
		{
			href: 'mailto:prity.dudi@@gmail.com',
			iconSrc: 'assets/new-simple-icons/icons8-mail.svg',
			order: 0,
		},
		{
			href: 'https://github.com/preeti-dudi',
			iconSrc: 'assets/new-simple-icons/icons8-github.svg',
			order: 1,
		},
		{
			href: 'https://www.instagram.com/dudi.01.preeti/',
			iconSrc: 'assets/new-simple-icons/icons8-instagram.svg',
			order: 2,
		},
		{
			href: 'https://www.linkedin.com/in/preeti-dudi',
			iconSrc: 'assets/new-simple-icons/icons8-linkedin-2.svg',
			order: 3,
		},
		{
			href: 'https://www.upwork.com/freelancers/~0194dca2f8b52ffcf0',
			iconSrc: 'assets/new-simple-icons/icons8-upwork.svg',
			order: 4,
		},
	];

	// Create the main div element
	const socialLinksDiv = document.getElementById('social-links');

	// Loop through the socialLinksData to create 'a' elements
	socialLinksData.forEach((linkData) => {
		const anchor = document.createElement('a');
		anchor.target = '_blank';
		anchor.href = linkData.href;
		anchor.style.setProperty('--order', linkData.order);

		const img = document.createElement('img');
		img.src = linkData.iconSrc;
		img.className = 'svg-image';

		anchor.appendChild(img);
		socialLinksDiv.appendChild(anchor);
	});
}










