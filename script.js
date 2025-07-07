const container = document.getElementById('container');
const circle = document.getElementById('circle');
const reactionTimeDisplay = document.getElementById('reactionTime');
const clickCountDisplay = document.getElementById('clickCount');

let startTime;
let clickCount = 0;

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeCircle() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const size = Math.random() * 100 + 50;
    const top = Math.random() * (windowHeight - size);
    const left = Math.random() * (windowWidth - size);

    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.backgroundColor = getRandomColor();
    circle.style.top = top + "px";
    circle.style.left = left + "px";
    circle.style.display = "block";

    startTime = Date.now();
}

function appearAfterDelay() {
    const delay = Math.random() * 2000 + 1000;
    setTimeout(makeCircle, delay);
}

circle.addEventListener("click", () => {
    const endTime = Date.now();
    const reactionTime = (endTime - startTime) / 1000;

    reactionTimeDisplay.textContent = `Your reaction time: ${reactionTime.toFixed(3)} seconds`;
    clickCount++;
    clickCountDisplay.textContent = `Circles Clicked: ${clickCount}`;

    breakCircle();
});

function breakCircle() {
    const circleRect = circle.getBoundingClientRect();
    const pieceCount = 20;
    const circleColor = circle.style.backgroundColor;

    circle.style.display = "none";

    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement("div");
        piece.className = "piece";
        piece.style.backgroundColor = circleColor;

        const size = parseFloat(circle.style.width) / 6;
        piece.style.width = size + "px";
        piece.style.height = size + "px";

        piece.style.left = (circleRect.left + circleRect.width / 2 - size / 2) + "px";
        piece.style.top = (circleRect.top + circleRect.height / 2 - size / 2) + "px";

        const dx = (Math.random() - 0.5) * 300 + "px";
        const dy = (Math.random() - 0.5) * 300 + "px";
        piece.style.setProperty('--dx', dx);
        piece.style.setProperty('--dy', dy);

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 1000);
    }

    appearAfterDelay();
}

appearAfterDelay();
