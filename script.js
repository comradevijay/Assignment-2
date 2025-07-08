const square = document.getElementById('square');
const reactionTimeDisplay = document.getElementById('reactionTime');
const clickCountDisplay = document.getElementById('clickCount');

let startTime;
let clickCount = 0;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function makeSquare() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const size = Math.random() * 100 + 50;
  const top = Math.random() * (windowHeight - size);
  const left = Math.random() * (windowWidth - size);

  square.style.width = size + 'px';
  square.style.height = size + 'px';
  square.style.backgroundColor = getRandomColor();
  square.style.top = top + 'px';
  square.style.left = left + 'px';
  square.style.display = 'block';

  startTime = Date.now();
}

function appearAfterDelay() {
  const delay = Math.random() * 2000 + 1000;
  setTimeout(makeSquare, delay);
}

square.addEventListener('click', () => {
  const endTime = Date.now();
  const reactionTime = (endTime - startTime) / 1000;

  reactionTimeDisplay.textContent = `Your reaction time: ${reactionTime.toFixed(3)} seconds`;
  clickCount++;
  clickCountDisplay.textContent = `Squares Clicked: ${clickCount}`;

  breakSquare();
});

function breakSquare() {
  const rect = square.getBoundingClientRect();
  const pieceCount = 20;
  const color = square.style.backgroundColor;

  const size = parseFloat(square.style.width);
  square.style.display = 'none';

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('div');
    piece.className = 'piece';
    piece.style.backgroundColor = color;

    const fragSize = size / 6;
    piece.style.width = fragSize + 'px';
    piece.style.height = fragSize + 'px';

    piece.style.left = rect.left + size / 2 - fragSize / 2 + 'px';
    piece.style.top = rect.top + size / 2 - fragSize / 2 + 'px';

    const dx = (Math.random() - 0.5) * 300 + 'px';
    const dy = (Math.random() - 0.5) * 300 + 'px';
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
