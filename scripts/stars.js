const body = document.body;
const numberOfStars = 100;

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    star.style.width = `${Math.random() * 2 + 1}px`;
    star.style.height = star.style.width;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;

    body.appendChild(star);
}
